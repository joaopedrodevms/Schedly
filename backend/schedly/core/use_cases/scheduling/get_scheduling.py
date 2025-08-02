import uuid
from interface.schemas.Scheduling import SchedulingDto
from infra.repositories.scheduling_repository import SchedulingRepository, Scheduling


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
                event_id=scheduling.event_id,
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
