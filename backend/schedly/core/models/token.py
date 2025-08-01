from infra.database.base import BaseTable, Field
from utils.generate_schemas import generate_schema
from sqlmodel import Relationship
from datetime import datetime
import uuid
from .user import User


class Token(BaseTable, table=True):
    __tablename__ = 'tokens'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no models.py
    # cd splice
    # alembic revision --autogenerate -m "create_table_token"
    # Relação com a tabela 'users'
    user_id: uuid.UUID = Field(foreign_key='users.id')
    user: User = Relationship(
        back_populates='tokens', sa_relationship_kwargs={'lazy': 'selectin'}
    )
    type: str = Field()
    value: str = Field()
    expires_at: datetime = Field(nullable=False)


TokenCreateSchema = generate_schema(Token)
TokenUpdateSchema = generate_schema(Token, optional=True)
