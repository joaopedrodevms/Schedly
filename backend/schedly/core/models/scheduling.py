from enum import Enum
from datetime import datetime
from infra.database.base import BaseTable, Field
from .event import Event
from sqlmodel import Relationship
import uuid


class EventStatus(Enum):
    STATUS_PENDING = "status_pending"
    STATUS_CONFIRMED = "status_confirmed"
    STATUS_CANCELLED = "status_cancelled"
    STATUS_RESCHEDULED = "status_rescheduled"


class Scheduling(BaseTable, table=True):
    __tablename__ = 'schedulings'
    event_id: uuid.UUID = Field(foreign_key='events.id')
    event: Event = Relationship(
        sa_relationship_kwargs={'lazy': 'selectin'}
    )
    quest_name: str = Field(nullable=True)
    quest_email: str = Field(nullable=True)
    quest_message: str = Field(nullable=False)
    status: EventStatus = Field(
        nullable=False, default=EventStatus.STATUS_PENDING
    )
    starts_at: datetime = Field(nullable=False)
    ends_at: datetime = Field(nullable=False)
