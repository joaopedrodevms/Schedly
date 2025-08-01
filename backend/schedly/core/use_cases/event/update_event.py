from infra.repositories.event_repository import EventRepository, Event


class UpdateEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def execute(self, event_id: str, **kwargs) -> Event:
        # Obtém  pelo ID
        event = await self.event_repo.get_by_id(event_id)

        if not event:
            raise ValueError('Event não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(event, key):
                setattr(event, key, value)

        return await self.event_repo.save(event)
