from infra.database.base import BaseTable, Field
from utils.generate_schemas import generate_schema
from sqlmodel import Relationship
import uuid
from .user import User
from typing import Optional


class EventType(BaseTable, table=True):
    __tablename__ = 'event_types'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no models.py
    # cd splice
    # alembic revision --autogenerate -m "create_tableevent_type"
    user_id: uuid.UUID = Field(foreign_key='users.id')
    user: User = Relationship(
        back_populates='event_types',
        sa_relationship_kwargs={'lazy': 'selectin'},
    )

    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    slug: str = Field(nullable=False, unique=True)
    buffer_before: int = Field(nullable=False)
    buffer_after: int = Field(nullable=False)
    duration_minutes: int = Field(nullable=False)
    location_type: str = Field(nullable=False)

    events: Optional['Event'] = Relationship(  # type: ignore #noqa: F821
        back_populates='event_type',
        sa_relationship_kwargs={'lazy': 'selectin'},
    )


EventTypeCreateSchema = generate_schema(EventType)
EventTypeUpdateSchema = generate_schema(EventType, optional=True)
