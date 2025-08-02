from datetime import time
import uuid
from pydantic import BaseModel


class Availability(BaseModel):
    week_day: int
    start_time: time
    end_time: time

class AvailsDto(BaseModel):
    event_id: uuid.UUID
    availability: list[Availability]
