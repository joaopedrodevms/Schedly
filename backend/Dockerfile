# Estágio de build
FROM python:3.12-slim as builder

# Argumentos de build
ARG ENVIRONMENT=development

# Variáveis de ambiente para build
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.7.1 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR=/tmp/poetry_cache

# Instala as dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Instala o Poetry
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY pyproject.toml poetry.lock ./

# Instala as dependências baseado no ambiente
RUN if [ "$ENVIRONMENT" = "production" ]; then \
        poetry install --only main --no-cache; \
    else \
        poetry install --no-cache; \
    fi

# Copia o resto do código
COPY . .

# Estágio final
FROM python:3.12-slim

# Argumentos e variáveis de ambiente
ARG ENVIRONMENT=development
ENV ENVIRONMENT=$ENVIRONMENT \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copia apenas os arquivos necessários do estágio builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /app .

# Instala apenas as dependências de runtime necessárias
RUN apt-get update && apt-get install -y \
    libpq5 \
    curl \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Cria e usa um usuário não-root com mesmo nome do banco de dados
RUN useradd -m -u 1000 schedly && \
    chown -R schedly:schedly /app
USER schedly

# Expõe a porta da API
EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Scripts de inicialização e healthcheck
COPY --chown=schedly:schedly scripts/start.sh scripts/healthcheck.sh /app/scripts/
RUN chmod +x /app/scripts/start.sh /app/scripts/healthcheck.sh

# Healthcheck mais robusto
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD /app/scripts/healthcheck.sh

# Comando para iniciar a aplicação
CMD ["/app/scripts/start.sh"]