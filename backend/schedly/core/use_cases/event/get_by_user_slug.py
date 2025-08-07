from typing import Optional, List
from datetime import datetime, time
from interface.exceptions.custom_exceptions import NotFoundException
from interface.schemas.Event import EventBySlugRequestDto, EventWithAvailabilityDto, EventAvailabilityDto, EventUnavailabilityDto, UserProfileDto
from infra.repositories.event_repository import EventRepository
from infra.repositories.user_repository import UserRepository
from infra.repositories.avails_repository import AvailsRepository
from infra.repositories.scheduling_repository import SchedulingRepository


class GetEventByUserSlug:
    """
    Caso de uso para buscar um evento público pelo slug do usuário e do evento.
    
    Este caso de uso:
    1. Valida a existência do usuário pelo slug
    2. Busca o evento pelo slug e user_id
    3. Busca as disponibilidades e agendamentos do evento
    4. Retorna os dados públicos do evento com horários
    
    Por ser uma rota pública:
    - Não expõe dados sensíveis do usuário
    - Retorna mensagens de erro genéricas
    - Valida os slugs contra injeção
    """
    
    def __init__(
        self,
        event_repo: EventRepository,
        user_repo: UserRepository,
        avails_repo: AvailsRepository,
        scheduling_repo: SchedulingRepository
    ):
        self.event_repo = event_repo
        self.user_repo = user_repo
        self.avails_repo = avails_repo
        self.scheduling_repo = scheduling_repo

    async def execute(self, data: EventBySlugRequestDto) -> EventWithAvailabilityDto:
        """
        Executa a busca do evento público.
        
        Args:
            user_slug: Slug do usuário
            event_slug: Slug do evento
            
        Returns:
            EventBySlugResponseDto: Dados públicos do evento
            
        Raises:
            NotFoundException: Se o evento não for encontrado
            ValueError: Se os slugs forem inválidos
        """
        # Validação básica dos slugs para prevenir injeção
        if not self._is_valid_slug(data.user_slug) or not self._is_valid_slug(data.event_slug):
            raise ValueError("Invalid URL format")
            
        # Busca o usuário pelo slug
        user = await self.user_repo.get_by_slug(data.user_slug)
        if not user:
            # Não revelamos se o usuário existe ou não
            raise NotFoundException("Event not found")
            
        # Busca o evento pelo slug e user_id
        events = await self.event_repo.get_by_user_id(user.id)
        if not events:
            raise NotFoundException("Event not found")
        
        event = next((e for e in events if e.slug == data.event_slug), None)
        if not event:
            raise NotFoundException("Event not found")

        # Busca as disponibilidades do evento
        avails = await self.avails_repo.get_by_event_id(event.id)
        if not avails:
            raise NotFoundException("Event not found")
            
        # Busca os agendamentos futuros do evento
        schedulings = await self.scheduling_repo.get_by_event_id(event.id)
        future_schedulings = [
            s for s in schedulings 
            if s.starts_at > datetime.now()
        ]
        
        # Converte as disponibilidades para o formato do DTO
        availability_dto = [
            EventAvailabilityDto(
                week_day=avail.week_day,
                start_time=avail.start_time,
                end_time=avail.end_time
            )
            for avail in avails
        ]
        
        # Converte os agendamentos futuros para o formato do DTO
        unavailability_dto = [
            EventUnavailabilityDto(
                starts_at=scheduling.starts_at,
                ends_at=scheduling.ends_at
            )
            for scheduling in future_schedulings
        ]
        
        # Busca os dados públicos do usuário
        user_profile = UserProfileDto(
            name=user.name,
            avatar_url=user.avatar_url or "",
            cover_url=user.cover_url or ""
        )
        
        # Retorna o DTO completo
        return EventWithAvailabilityDto(
            id=event.id,
            title=event.title,
            description=event.description,
            duration_minutes=event.duration_minutes,
            location_type=event.location_type,
            avails=availability_dto,
            not_available=unavailability_dto,
            user=user_profile
        )
    
    @staticmethod
    def _is_valid_slug(slug: str) -> bool:
        """
        Valida se o slug tem um formato seguro.
        Aceita apenas letras, números, hífens e underscores.
        """
        if not slug or len(slug) > 100:
            return False
            
        import re
        return bool(re.match(r'^[a-zA-Z0-9\-_]+$', slug))