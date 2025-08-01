# app/api/services/event_service.py
from core.use_cases.event import (
    CreateEvent,
    DeleteEvent,
    GetEvent,
    UpdateEvent,
)
from infra.repositories.event_repository import EventRepository, Event


class EventService:
    def __init__(self, repo: EventRepository):
        self.repo = repo

    async def create(self, **kwargs) -> Event:
        use_case = CreateEvent(self.repo)
        return await use_case.execute(**kwargs)

    async def get_by_id(self, event_id: int) -> Event | None:
        use_case = GetEvent(self.repo)
        return await use_case.get_by_id(event_id)

    async def update(self, event_id: int, **kwargs) -> Event:
        use_case = UpdateEvent(self.repo)
        return await use_case.execute(event_id=event_id, **kwargs)

    async def delete(self, event_id: int) -> None:
        use_case = DeleteEvent(self.repo)
        return await use_case.execute(event_id)
