#!/bin/sh

# Dá permissão de execução ao script de migrações
chmod +x /app/scripts/run_migrations.sh

# Aguarda os serviços necessários
echo "Waiting for required services..."
/app/scripts/healthcheck.sh

# Executa as migrações do banco de dados
echo "Running database migrations..."
/app/scripts/run_migrations.sh

# Se as migrações falharem, sai com erro
if [ $? -ne 0 ]; then
    echo "Failed to run migrations. Exiting..."
    exit 1
fi

# Inicia a aplicação
echo "Starting application in $ENVIRONMENT mode..."
cd /app && python -m uvicorn schedly.app:app --host 0.0.0.0 --port 8000 --reload
