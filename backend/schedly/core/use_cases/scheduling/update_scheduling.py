from schedly.interface.schemas.Scheduling import SchedulingDto, SchedulingUpdateRequestDto
from schedly.interface.schemas.Event import EventDto
from schedly.infra.repositories.scheduling_repository import SchedulingRepository


class UpdateScheduling:
    def __init__(self, scheduling_repo: SchedulingRepository):
        self.scheduling_repo = scheduling_repo

    async def execute(self, scheduling_id: str, data: SchedulingUpdateRequestDto) -> SchedulingDto:
        # Obtém  pelo ID
        scheduling = await self.scheduling_repo.get_by_id(scheduling_id)

        if not scheduling:
            raise ValueError('Scheduling não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in data.model_dump().items():
            if value is not None and hasattr(scheduling, key):
                setattr(scheduling, key, value)

        updated_scheduling = await self.scheduling_repo.update(scheduling)
        
        return SchedulingDto(
            id=updated_scheduling.id,
            event=EventDto(
                id=updated_scheduling.event.id,
                user_id=updated_scheduling.event.user_id,
                title=updated_scheduling.event.title,
                description=updated_scheduling.event.description,
                slug=updated_scheduling.event.slug,
                buffer_before=updated_scheduling.event.buffer_before,
                buffer_after=updated_scheduling.event.buffer_after,
                duration_minutes=updated_scheduling.event.duration_minutes,
                location_type=updated_scheduling.event.location_type,
                created_at=updated_scheduling.event.created_at,
                updated_at=updated_scheduling.event.updated_at
            ),
            quest_name=updated_scheduling.quest_name,
            quest_email=updated_scheduling.quest_email,
            quest_message=updated_scheduling.quest_message,
            status=updated_scheduling.status,
            starts_at=updated_scheduling.starts_at,
            ends_at=updated_scheduling.ends_at,
            created_at=updated_scheduling.created_at,
            updated_at=updated_scheduling.updated_at
        )
