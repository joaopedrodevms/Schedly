import uuid
import datetime
from typing import Optional, List
from datetime import time
from core.models.event import EventLocation
from pydantic import BaseModel

class UserProfileDto(BaseModel):
    name: str
    avatar_url: str
    cover_url: str

class EventAvailabilityDto(BaseModel):
    week_day: int
    start_time: time
    end_time: time

class EventUnavailabilityDto(BaseModel):
    starts_at: datetime.datetime
    ends_at: datetime.datetime

class EventWithAvailabilityDto(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    duration_minutes: int
    location_type: EventLocation
    avails: List[EventAvailabilityDto]
    not_available: List[EventUnavailabilityDto]
    user: Optional[UserProfileDto] = None

class EventBySlugRequestDto(BaseModel):
    user_slug: str
    event_slug: str

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
