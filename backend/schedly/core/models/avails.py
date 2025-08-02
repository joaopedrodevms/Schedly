from datetime import time
from sqlalchemy import Time as SATime  # alias para evitar conflito com datetime.time
from infra.database.base import BaseTable
from .event import Event
from sqlmodel import Relationship, Field, Column
import uuid

class Avails(BaseTable, table=True):
    __tablename__ = 'avails'
    event_id: uuid.UUID = Field(foreign_key='events.id')
    event: Event = Relationship(
        sa_relationship_kwargs={'lazy': 'selectin'}
    )
    week_day: int = Field(nullable=False)
    start_time: time = Field(
        sa_column=Column(SATime, nullable=False)
    )
    end_time: time = Field(
        sa_column=Column(SATime, nullable=False)
    )
