import uuid
from infra.repositories.avails_repository import AvailsRepository
from core.use_cases.event import (
    CreateEvent,
    DeleteEvent,
    GetEvent,
    GetEventByUserId,
    UpdateEvent,
)
from infra.repositories.event_repository import (
    EventRepository,
    Event,
)
from interface.schemas.Event import EventCreateRequestDto, EventDto, EventUpdateRequestDto
from infra.repositories.user_repository import UserRepository
from infra.repositories.scheduling_repository import SchedulingRepository

class EventService:
    def __init__(self, repo: EventRepository, user_repo: UserRepository, avail_repo: AvailsRepository, scheduling_repo: SchedulingRepository):
        self.repo = repo
        self.user_repo = user_repo
        self.avail_repo = avail_repo
        self.scheduling_repo = scheduling_repo

    async def create(self, data: EventCreateRequestDto) -> EventDto:
        use_case = CreateEvent(self.repo, self.user_repo, self.avail_repo)
        return await use_case.execute(data)

    async def get_by_id(self, event_id: uuid.UUID) -> list[EventDto]:
        use_case = GetEvent(self.repo)
        return await use_case.get_by_id(event_id)

    async def get_by_user_id(self, user_id: uuid.UUID) -> list[EventDto]:
        use_case = GetEventByUserId(self.repo)
        return await use_case.get_by_user_id(user_id)

    async def update(self, data: EventUpdateRequestDto, user_id: uuid.UUID) -> EventDto:
        use_case = UpdateEvent(self.repo)
        return await use_case.execute(data, user_id)

    async def delete(self, event_id: uuid.UUID) -> EventDto:
        use_case = DeleteEvent(self.repo, self.scheduling_repo, self.avail_repo)
        return await use_case.execute(event_id)
