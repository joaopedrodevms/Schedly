import uuid
from schedly.interface.schemas.Avails import AvailsDto
from schedly.core.use_cases.avails import (
    CreateAvails,
    GetAvailsByEventId,
)
from schedly.infra.repositories.avails_repository import AvailsRepository


class AvailsService:
    def __init__(self, repo: AvailsRepository):
        self.repo = repo

    async def create(self, data: AvailsDto) -> AvailsDto:
        use_case = CreateAvails(self.repo)
        return await use_case.execute(data)

    async def get_by_event_id(self, event_id: uuid.UUID) -> AvailsDto | None:
        use_case = GetAvailsByEventId(self.repo)
        return await use_case.get_by_event_id(event_id)

