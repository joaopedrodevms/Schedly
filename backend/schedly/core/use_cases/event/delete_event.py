import uuid
from interface.schemas.Event import EventDto
from infra.repositories.event_repository import EventRepository
from infra.repositories.scheduling_repository import SchedulingRepository
from infra.repositories.avails_repository import AvailsRepository


class DeleteEvent:
    def __init__(self, event_repo: EventRepository, scheduling_repo: SchedulingRepository, avail_repo: AvailsRepository):
        self.event_repo = event_repo
        self.scheduling_repo = scheduling_repo
        self.avail_repo = avail_repo

    async def execute(self, event_id: uuid.UUID) -> EventDto:
        await self.scheduling_repo.delete_by_event_id(event_id)
        await self.avail_repo.delete_by_event_id(event_id)
        event = await self.event_repo.delete(event_id)
        return EventDto(**event.model_dump())
