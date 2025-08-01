from infra.repositories.event_repository import EventRepository, Event


class GetEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def get_by_id(self, event_id: int) -> Event | None:
        return await self.event_repo.get_by_id(event_id)
