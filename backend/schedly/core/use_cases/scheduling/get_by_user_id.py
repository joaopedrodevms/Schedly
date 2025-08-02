import uuid
from typing import List

from interface.schemas.Scheduling import SchedulingDto
from infra.repositories.event_repository import EventRepository
from infra.repositories.scheduling_repository import SchedulingRepository
from core.models.scheduling import Scheduling


class GetSchedulingByUserId:
    """Caso de uso para obter todos os agendamentos de um usuário."""
    
    def __init__(self, scheduling_repo: SchedulingRepository, event_repo: EventRepository):
        """
        Inicializa o caso de uso.
        
        Args:
            scheduling_repo: Repositório de agendamentos
            event_repo: Repositório de eventos
        """
        self.scheduling_repo = scheduling_repo
        self.event_repo = event_repo

    async def get_by_user_id(self, user_id: uuid.UUID) -> List[SchedulingDto]:
        """
        Obtém todos os agendamentos dos eventos de um usuário.
        
        Args:
            user_id: ID do usuário
            
        Returns:
            List[SchedulingDto]: Lista de agendamentos do usuário
        """
        events = await self.event_repo.get_by_user_id(user_id)
        all_schedulings: List[Scheduling] = []
        
        for event in events:
            event_schedulings = await self.scheduling_repo.get_by_event_id(event.id)
            all_schedulings.extend(event_schedulings)
            
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
            for scheduling in all_schedulings
        ]