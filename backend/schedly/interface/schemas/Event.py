import uuid
import datetime
from typing import Optional
from core.models.event import EventLocation
from pydantic import BaseModel

class EventDto(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    title: str
    description: str
    slug: str
    buffer_before: int
    buffer_after: int
    duration_minutes: int
    location_type: EventLocation
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

class EventCreateRequestDto(BaseModel):
    user_id: uuid.UUID
    title: str
    description: str
    slug: str
    buffer_before: int
    buffer_after: int
    duration_minutes: int
    location_type: EventLocation

class EventUpdateRequestDto(BaseModel):
    id: uuid.UUID
    title: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    buffer_before: Optional[int] = None
    buffer_after: Optional[int] = None
    duration_minutes: Optional[int] = None
    location_type: Optional[EventLocation] = None
