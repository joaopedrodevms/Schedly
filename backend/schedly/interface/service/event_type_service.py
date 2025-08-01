# app/api/services/event_type_service.py
from core.use_cases.event_type import (
    CreateEventType,
    DeleteEventType,
    GetEventType,
    UpdateEventType,
)
from infra.repositories.event_type_repository import (
    EventTypeRepository,
    EventType,
)


class EventTypeService:
    def __init__(self, repo: EventTypeRepository):
        self.repo = repo

    async def create(self, **kwargs) -> EventType:
        use_case = CreateEventType(self.repo)
        return await use_case.execute(**kwargs)

    async def get_by_id(self, event_type_id: int) -> EventType | None:
        use_case = GetEventType(self.repo)
        return await use_case.get_by_id(event_type_id)

    async def update(self, event_type_id: int, **kwargs) -> EventType:
        use_case = UpdateEventType(self.repo)
        return await use_case.execute(event_type_id=event_type_id, **kwargs)

    async def delete(self, event_type_id: int) -> None:
        use_case = DeleteEventType(self.repo)
        return await use_case.execute(event_type_id)
