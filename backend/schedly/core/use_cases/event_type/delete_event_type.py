from infra.repositories.event_type_repository import EventTypeRepository


class DeleteEventType:
    def __init__(self, event_type_repo: EventTypeRepository):
        self.event_type_repo = event_type_repo

    async def execute(self, event_type_id: int) -> None:
        await self.event_type_repo.delete(event_type_id)
