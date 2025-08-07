import uuid
from schedly.interface.schemas.Event import EventDto, EventUpdateRequestDto
from schedly.infra.repositories.event_repository import EventRepository, Event
from schedly.utils.validate_slug import validate_slug


class UpdateEvent:
    def __init__(self, event_repo: EventRepository):
        self.event_repo = event_repo

    async def execute(self, data: EventUpdateRequestDto, user_id: uuid.UUID) -> EventDto:
        # Obtém evento pelo ID
        event = await self.event_repo.get_by_id(data.id)

        if not event:
            raise ValueError('Event não encontrado')
        
        if data.slug:
            await self._validate_unique_slug(user_id=user_id, slug=data.slug)

        # Atualiza somente os atributos fornecidos que não são None
        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            if hasattr(event, key):
                setattr(event, key, value)

        updated_event = await self.event_repo.update(event)
        return EventDto(**updated_event.model_dump())

    async def _validate_unique_slug(self, user_id: uuid.UUID, slug: str) -> None:
        """Valida se o slug é único para o usuário."""
        slugs = await self.event_repo.get_slugs_by_user_id(user_id)
        if slug in slugs:
            raise ValueError('Evento com slug já existe')
        
        if not validate_slug(slug):
            raise ValueError('Slug inválido')