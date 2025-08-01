from infra.database.base import BaseTable, Field
from typing import Optional
from utils.generate_schemas import generate_schema
from sqlmodel import Relationship


class User(BaseTable, table=True):
    __tablename__ = 'users'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no init do models
    # cd schedly
    # alembic revision --autogenerate -m "create_tableuser"

    name: str = Field(nullable=False)
    email: str = Field(nullable=False, unique=True)
    password: str = Field(nullable=False)
    slug: str = Field(nullable=False, unique=True)
    avatar_url: str = Field(nullable=False)
    cover_url: str = Field(nullable=False)
    timezone: str = Field(nullable=False)
    email_verified: bool = Field(nullable=True, default=False)
    is_active: bool = Field(nullable=True, default=False)

    tokens: Optional['Token'] = Relationship(  # type: ignore #noqa: F821
        back_populates='user', sa_relationship_kwargs={'lazy': 'selectin'}
    )
    event_types: Optional['EventType'] = Relationship(  # type: ignore #noqa: F821
        back_populates='user', sa_relationship_kwargs={'lazy': 'selectin'}
    )


UserCreateSchema = generate_schema(User)
UserUpdateSchema = generate_schema(User, optional=True)
