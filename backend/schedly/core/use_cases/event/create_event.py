"""
Caso de uso para criação de eventos com disponibilidades padrão.
"""
from datetime import time
from typing import List

from schedly.core.models.avails import Avails
from schedly.interface.schemas.Avails import AvailsDto, Availability
from schedly.infra.repositories.avails_repository import AvailsRepository
from schedly.infra.repositories.user_repository import UserRepository
from schedly.interface.schemas.Event import EventCreateRequestDto, EventDto
from schedly.infra.repositories.event_repository import (
    EventRepository,
    Event,
)
from schedly.utils.validate_slug import validate_slug


class CreateEvent:
    """
    Caso de uso para criar um novo evento com suas disponibilidades padrão.
    
    Este caso de uso:
    1. Valida a existência do usuário
    2. Verifica se o slug é único para o usuário
    3. Cria o evento
    4. Cria as disponibilidades padrão (dias úteis, 9h às 18h)
    """
    
    def __init__(self, event_repo: EventRepository, user_repo: UserRepository, avail_repo: AvailsRepository):
        self.event_repo = event_repo
        self.user_repo = user_repo
        self.avail_repo = avail_repo

    def _validate_event_parameters(self, data: EventCreateRequestDto) -> None:
        """
        Valida os parâmetros do evento antes da criação.
        
        Args:
            data: Dados do evento a ser validado
            
        Raises:
            ValueError: Se algum parâmetro for inválido
        """
        if not data.title or len(data.title.strip()) < 3:
            raise ValueError('O título do evento deve ter pelo menos 3 caracteres')
            
        if not data.slug or len(data.slug.strip()) < 3:
            raise ValueError('O slug do evento deve ter pelo menos 3 caracteres')
            
        if not data.slug.isalnum() and '-' not in data.slug:
            raise ValueError('O slug deve conter apenas letras, números ou hífen')
            
        if data.duration_minutes < 15:
            raise ValueError('A duração mínima do evento deve ser de 15 minutos')
            
        if data.duration_minutes > 480:  # 8 horas
            raise ValueError('A duração máxima do evento deve ser de 8 horas')
            
        if data.buffer_before < 0 or data.buffer_after < 0:
            raise ValueError('Os buffers não podem ser negativos')
            
        if data.buffer_before + data.buffer_after > 120:  # 2 horas
            raise ValueError('A soma dos buffers não pode exceder 2 horas')

    async def execute(self, data: EventCreateRequestDto) -> EventDto:
        """
        Executa o caso de uso de criação de evento.
        
        Args:
            data: Dados do evento a ser criado
            
        Returns:
            EventDto: Evento criado
            
        Raises:
            ValueError: Se o usuário não existir ou se o slug já existir
        """
        self._validate_event_parameters(data)
        await self._validate_user(data.user_id)
        new_event = self._create_event_model(data)
        await self._validate_unique_slug(new_event)
        
        created_event = await self.event_repo.save(new_event)
        await self._create_default_availabilities(created_event.id)
        
        return EventDto(**created_event.model_dump())

    async def _validate_user(self, user_id: str) -> None:
        """Valida se o usuário existe."""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise ValueError('User não encontrado')

    def _create_event_model(self, data: EventCreateRequestDto) -> Event:
        """Cria o modelo de evento a partir dos dados do DTO."""
        return Event(
            user_id=data.user_id,
            title=data.title,
            description=data.description,
            slug=data.slug,
            buffer_before=data.buffer_before,
            buffer_after=data.buffer_after,
            duration_minutes=data.duration_minutes,
            location_type=data.location_type,
        )

    async def _validate_unique_slug(self, event: Event) -> None:
        """Valida se o slug é único para o usuário."""
        slugs = await self.event_repo.get_slugs_by_user_id(event.user_id)
        if event.slug in slugs:
            raise ValueError('Evento com slug já existe')
        
        if not validate_slug(event.slug):
            raise ValueError('Slug inválido')

    async def _create_default_availabilities(self, event_id: str) -> None:
        """Cria as disponibilidades padrão para o evento."""
        availabilities = self._create_availabilities_dto(event_id)
        await self._save_availabilities(availabilities)

    def _create_availabilities_dto(self, event_id: str) -> AvailsDto:
        """Cria o DTO de disponibilidades com valores padrão."""
        return AvailsDto(
            event_id=event_id,
            availability=[
                Availability(
                    week_day=day,
                    start_time="09:00",
                    end_time="18:00"
                )
                for day in range(0, 5)  # Segunda a Sexta
            ]
        )

    async def _save_availabilities(self, availabilities: AvailsDto) -> None:
        """Salva as disponibilidades no banco de dados."""
        for availability in availabilities.availability:
            new_avails = Avails(
                event_id=availabilities.event_id,
                week_day=availability.week_day,
                start_time=self._parse_time_str(availability.start_time),
                end_time=self._parse_time_str(availability.end_time)
            )
            await self.avail_repo.save(new_avails)

    @staticmethod
    def _parse_time_str(time_value: str | time) -> time:
        """Converte uma string de hora (HH:MM) ou um objeto time para um objeto time."""
        if isinstance(time_value, time):
            return time_value
        
        hour, minute = map(int, time_value.split(':'))
        return time(hour, minute)
