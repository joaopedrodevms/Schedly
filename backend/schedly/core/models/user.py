from infra.database.base import BaseTable, Field
from typing import Optional
from utils.generate_schemas import generate_schema
from sqlmodel import Relationship


class User(BaseTable, table=True):
    __tablename__ = 'users'
    name: str = Field(nullable=False)
    email: str = Field(nullable=False, unique=True)
    slug: str = Field(nullable=False, unique=True)
    password: str = Field(nullable=False)
    email_verified: bool = Field(nullable=True, default=False)
    avatar_url: str = Field(nullable=True, default='')
    cover_url: str = Field(nullable=True, default='')
    timezone: str = Field(nullable=False)
    is_active: bool = Field(nullable=True, default=False)

    events: Optional['Event'] = Relationship(  # type: ignore #noqa: F821
        back_populates='user', sa_relationship_kwargs={'lazy': 'selectin'}
    )
