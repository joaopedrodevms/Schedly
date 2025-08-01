from enum import Enum
from datetime import datetime
from infra.database.base import BaseTable, Field
from utils.generate_schemas import generate_schema
from .event_type import EventType
from sqlmodel import Relationship
import uuid


class EventStatus(Enum):
    STATUS_PENDING = "status_pending"
    STATUS_CONFIRMED = "status_confirmed"
    STATUS_CANCELLED = "status_cancelled"
    STATUS_RESCHEDULED = "status_rescheduled"


class Event(BaseTable, table=True):
    __tablename__ = 'events'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no models.py
    # cd splice
    # alembic revision --autogenerate -m "create_table_event"
    event_type_id: uuid.UUID = Field(foreign_key='event_types.id')
    event_type: EventType = Relationship(
        back_populates='events', sa_relationship_kwargs={'lazy': 'selectin'}
    )
    quest_name: str = Field(nullable=True)
    quest_email: str = Field(nullable=True)
    quest_message: str = Field(nullable=False)
    status: EventStatus = Field(
        nullable=False, default=EventStatus.STATUS_PENDING
    )
    starts_at: datetime = Field(nullable=False)
    ends_at: datetime = Field(nullable=False)
    timezone: str = Field(nullable=False)


EventCreateSchema = generate_schema(Event)
EventUpdateSchema = generate_schema(Event, optional=True)
