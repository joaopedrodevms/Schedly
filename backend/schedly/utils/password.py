from passlib.hash import argon2

# Configuração do Argon2 com parâmetros recomendados
pwd_context = argon2.using(
    type='ID',  # Argon2id variant
    memory_cost=65536,  # 64MB
    time_cost=3,  # 3 iterações
    parallelism=4,  # 4 threads
)

def hash_password(password: str) -> str:
    """
    Gera um hash seguro para a senha usando Argon2.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha fornecida corresponde ao hash armazenado.
    """
    return pwd_context.verify(plain_password, hashed_password)