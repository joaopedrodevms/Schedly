from enum import Enum
from schedly.infra.database.base import BaseTable, Field
from schedly.utils.generate_schemas import generate_schema
from sqlmodel import Relationship
import uuid
from .user import User
from typing import Optional

class EventLocation(Enum):
    LOCATION_JITSI = "location_jitsi"
    LOCATION_ZOOM = "location_zoom"
    LOCATION_MEET = "location_meet"
    LOCATION_IN_PERSON = "location_in_person"

class Event(BaseTable, table=True):
    __tablename__ = 'events'
    user_id: uuid.UUID = Field(foreign_key='users.id')
    user: User = Relationship(
        back_populates='events',
        sa_relationship_kwargs={'lazy': 'selectin'},
    )

    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    slug: str = Field(nullable=False)
    buffer_before: int = Field(nullable=False)
    buffer_after: int = Field(nullable=False)
    duration_minutes: int = Field(nullable=False)
    location_type: EventLocation = Field(
        nullable=False, default=EventLocation.LOCATION_JITSI
    )
