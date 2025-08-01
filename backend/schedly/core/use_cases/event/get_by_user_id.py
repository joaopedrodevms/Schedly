import uuid
from interface.schemas.Event import EventDto
from infra.repositories.event_repository import (
    EventRepository,
    Event,
)


class GetEventByUserId:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def get_by_user_id(self, user_id: uuid.UUID) -> list[EventDto]:
        events = await self.event_repo.get_by_user_id(user_id)
        if not events:
            raise ValueError('Event não encontrado')
        return [EventDto(**event.model_dump()) for event in events]
