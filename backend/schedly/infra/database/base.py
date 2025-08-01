import uuid
from datetime import datetime
from typing import Optional

from sqlmodel import DateTime, Field, SQLModel, func


class BaseTable(SQLModel):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
    )
    created_at: datetime = Field(
        nullable=False,
        default_factory=datetime.now,
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={'onupdate': func.now(), 'nullable': True},
    )
