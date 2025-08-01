from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env', env_file_encoding='utf-8'
    )
    PROJECT_NAME: str = 'schedly'
    # Database
    DATABASE_URL: str = (
        'postgresql+asyncpg://postgres:123456@localhost:5432/schedly'
    )
    DATABASE_URL_TEST: str = 'postgres'
    MONGO_DB_NAME: str = PROJECT_NAME
    MONGO_URL: str = 'mongodb://localhost:27017/schedly'

    # JWT
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_ALGORITHM: str = 'HS256'
    JWT_SECRET_KEY: str = (
        'qualquer_texto'  # gere com comando: openssl rand -hex 32
    )

    # Log
    LOG_LEVEL: str = 'DEGUB'

    OPENAPI_URL: str = '/openapi.json'


settings = Settings()
