#!/bin/sh

# Configura o ambiente Python
export PYTHONPATH=/app

# Função para executar as migrações
run_migrations() {
    cd /app/schedly
    echo "Current directory: $(pwd)"
    echo "Python path: $PYTHONPATH"
    echo "Listing directory contents:"
    ls -la
    echo "Running migrations..."
    python -m alembic upgrade head
}

# Tenta executar as migrações
echo "Running database migrations..."
if run_migrations; then
    echo "Migrations completed successfully"
    exit 0
else
    echo "Migration failed. Retrying in 5 seconds..."
    sleep 5
    
    # Segunda tentativa
    if run_migrations; then
        echo "Migrations completed successfully on second attempt"
        exit 0
    else
        echo "Migration failed after two attempts"
        exit 1
    fi
fi
