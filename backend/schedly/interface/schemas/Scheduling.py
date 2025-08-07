import uuid
import datetime
from typing import Optional
from interface.schemas.Event import EventDto
from core.models.scheduling import EventStatus
from pydantic import BaseModel

class SchedulingDto(BaseModel):
    id: uuid.UUID
    event: EventDto
    quest_name: str
    quest_email: str
    quest_message: str
    status: EventStatus
    starts_at: datetime.datetime
    ends_at: datetime.datetime
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

class SchedulingCreateRequestDto(BaseModel):
    event_id: uuid.UUID
    quest_name: str
    quest_email: str
    quest_message: str
    starts_at: datetime.datetime

class SchedulingUpdateRequestDto(BaseModel):
    id: uuid.UUID
    quest_name: Optional[str] = None
    quest_email: Optional[str] = None
    quest_message: Optional[str] = None
    starts_at: Optional[datetime.datetime] = None
    ends_at: Optional[datetime.datetime] = None
