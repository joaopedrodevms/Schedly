#!/bin/sh

# Verifica se o PostgreSQL está disponível
pg_ready() {
    nc -z postgres 5432
}

# Verifica se o MinIO está disponível
minio_ready() {
    nc -z minio 9000
}

# Verifica se a aplicação está respondendo
app_ready() {
    curl -f http://localhost:8000/health
}

# Aguarda o PostgreSQL
until pg_ready; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

# Aguarda o MinIO
until minio_ready; do
    echo "Waiting for MinIO..."
    sleep 2
done

# Verifica a aplicação
if app_ready; then
    exit 0
else
    exit 1
fi
