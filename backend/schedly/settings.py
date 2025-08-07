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

    # JWT
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 86400
    JWT_ALGORITHM: str = 'HS256'
    JWT_SECRET_KEY: str = (
        'qualquer_texto'  # gere com comando: openssl rand -hex 32
    )

    # Log
    LOG_LEVEL: str = 'DEGUB'

    OPENAPI_URL: str = '/openapi.json'

    # MinIO
    MINIO_ENDPOINT: str = 'localhost:9000'
    MINIO_ACCESSKEY: str = 'admin'
    MINIO_SECRETKEY: str = 'admin1234'
    MINIO_SECURE: bool = False
    MINIO_BUCKET_NAME: str = 'schedly-profiles'
    MINIO_INTERNAL_URL: str = 'http://localhost:9000'
    MINIO_PUBLIC_URL: str = 'http://localhost:9000'


settings = Settings()
