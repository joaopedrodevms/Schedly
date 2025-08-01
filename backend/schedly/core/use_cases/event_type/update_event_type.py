from infra.repositories.event_type_repository import (
    EventTypeRepository,
    EventType,
)


class UpdateEventType:
    def __init__(self, event_type_repo: EventTypeRepository):
        self.event_type_repo = event_type_repo

    async def execute(self, event_type_id: str, **kwargs) -> EventType:
        # Obtém  pelo ID
        event_type = await self.event_type_repo.get_by_id(event_type_id)

        if not event_type:
            raise ValueError('EventType não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(event_type, key):
                setattr(event_type, key, value)

        return await self.event_type_repo.save(event_type)
