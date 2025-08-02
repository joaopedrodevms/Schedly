import uuid
import datetime
from typing import Optional
from pydantic import BaseModel

class UserPublicDto(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    slug: str
    email_verified: bool
    avatar_url: str
    cover_url: str
    timezone: str
    is_active: bool
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

class UserUpdateRequestDto(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    slug: Optional[str] = None
    email_verified: Optional[bool] = None
    avatar_url: Optional[str] = None
    cover_url: Optional[str] = None