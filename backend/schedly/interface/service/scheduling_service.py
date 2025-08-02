import uuid
from infra.repositories.avails_repository import AvailsRepository
from infra.repositories.event_repository import EventRepository
from interface.schemas.Scheduling import SchedulingCreateRequestDto, SchedulingDto
from core.use_cases.scheduling import (
    CreateScheduling,
    DeleteScheduling,
    GetScheduling,
    GetSchedulingByUserId,
    UpdateScheduling,
)
from infra.repositories.scheduling_repository import SchedulingRepository, Scheduling


class SchedulingService:
    def __init__(self, repo: SchedulingRepository, event_repo: EventRepository, avail_repo: AvailsRepository):
        self.repo = repo
        self.event_repo = event_repo
        self.avail_repo = avail_repo

    async def create(self, data: SchedulingCreateRequestDto) -> SchedulingDto:
        use_case = CreateScheduling(self.repo, self.event_repo, self.avail_repo)
        return await use_case.execute(data)

    async def get_by_id(self, scheduling_id: uuid.UUID) -> list[SchedulingDto]:
        use_case = GetScheduling(self.repo)
        return await use_case.get_by_id(scheduling_id)

    async def get_by_user_id(self, user_id: uuid.UUID) -> list[SchedulingDto]:
        use_case = GetSchedulingByUserId(self.repo, self.event_repo)
        return await use_case.get_by_user_id(user_id)

    async def update(self, scheduling_id: uuid.UUID, **kwargs) -> Scheduling:
        use_case = UpdateScheduling(self.repo)
        return await use_case.execute(scheduling_id=scheduling_id, **kwargs)

    async def delete(self, scheduling_id: uuid.UUID) -> None:
        use_case = DeleteScheduling(self.repo)
        return await use_case.execute(scheduling_id)
