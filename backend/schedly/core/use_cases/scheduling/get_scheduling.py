import uuid
from schedly.interface.schemas.Scheduling import SchedulingDto
from schedly.interface.schemas.Event import EventDto
from schedly.infra.repositories.scheduling_repository import SchedulingRepository, Scheduling


class GetScheduling:
    def __init__(self, scheduling_repo: SchedulingRepository):
        self.scheduling_repo = scheduling_repo

    async def get_by_id(self, scheduling_id: uuid.UUID) -> list[SchedulingDto]:
        scheduling = await self.scheduling_repo.get_by_id(scheduling_id)
        if not scheduling:
            return None
            
        return [
            SchedulingDto(
                id=scheduling.id,
                event=EventDto(
                    id=scheduling.event.id,
                    user_id=scheduling.event.user_id,
                    title=scheduling.event.title,
                    description=scheduling.event.description,
                    slug=scheduling.event.slug,
                    buffer_before=scheduling.event.buffer_before,
                    buffer_after=scheduling.event.buffer_after,
                    duration_minutes=scheduling.event.duration_minutes,
                    location_type=scheduling.event.location_type,
                    created_at=scheduling.event.created_at,
                    updated_at=scheduling.event.updated_at
                ),
                quest_name=scheduling.quest_name,
                quest_email=scheduling.quest_email,
                quest_message=scheduling.quest_message,
                status=scheduling.status,
                starts_at=scheduling.starts_at,
                ends_at=scheduling.ends_at,
                created_at=scheduling.created_at,
                updated_at=scheduling.updated_at
            )
        ]
