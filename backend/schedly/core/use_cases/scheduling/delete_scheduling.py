import uuid
from schedly.infra.repositories.scheduling_repository import SchedulingRepository


class DeleteScheduling:
    def __init__(self, scheduling_repo: SchedulingRepository):
        self.scheduling_repo = scheduling_repo

    async def execute(self, scheduling_id: uuid.UUID) -> None:
        scheduling = await self.scheduling_repo.delete(scheduling_id)
        return scheduling
