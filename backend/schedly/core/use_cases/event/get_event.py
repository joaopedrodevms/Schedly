import uuid
from interface.schemas.Event import EventDto
from infra.repositories.event_repository import EventRepository


class GetEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def get_by_id(self, event_id: uuid.UUID) -> list[EventDto]:
        event = await self.event_repo.get_by_id(event_id)
        if not event:
            raise ValueError('Event não encontrado')
        return [EventDto(**event.model_dump())]
