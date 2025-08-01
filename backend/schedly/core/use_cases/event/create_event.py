from infra.repositories.event_repository import EventRepository, Event


class CreateEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def execute(self, **kwargs) -> Event:
        new_event = Event(**kwargs)
        return await self.event_repo.save(new_event)
