from infra.repositories.event_type_repository import (
    EventTypeRepository,
    EventType,
)


class CreateEventType:
    def __init__(self, event_type_repo: EventTypeRepository):
        self.event_type_repo = event_type_repo

    async def execute(self, **kwargs) -> EventType:
        new_event_type = EventType(**kwargs)
        return await self.event_type_repo.save(new_event_type)
