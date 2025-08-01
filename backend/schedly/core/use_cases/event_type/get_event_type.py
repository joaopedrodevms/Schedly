from infra.repositories.event_type_repository import (
    EventTypeRepository,
    EventType,
)


class GetEventType:
    def __init__(self, event_type_repo: EventTypeRepository):
        self.event_type_repo = event_type_repo

    async def get_by_id(self, event_type_id: int) -> EventType | None:
        return await self.event_type_repo.get_by_id(event_type_id)
