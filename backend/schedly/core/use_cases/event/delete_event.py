from infra.repositories.event_repository import EventRepository


class DeleteEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def execute(self, event_id: int) -> None:
        await self.event_repo.delete(event_id)
