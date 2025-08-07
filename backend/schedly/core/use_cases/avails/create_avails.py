"""
Caso de uso para criação e atualização de disponibilidades de um evento.
"""
from datetime import time
from typing import List

from schedly.interface.schemas.Avails import AvailsDto, Availability
from schedly.infra.repositories.avails_repository import AvailsRepository, Avails


class CreateAvails:
    """
    Caso de uso para criar ou atualizar as disponibilidades de um evento.
    
    Este caso de uso:
    1. Valida se o evento existe
    2. Remove disponibilidades anteriores
    3. Cria novas disponibilidades
    4. Valida os horários e dias da semana
    """
    
    VALID_WEEK_DAYS = range(0, 7)  # 0 (Segunda) a 6 (Domingo)
    
    def __init__(self, avails_repo: AvailsRepository):
        self.avails_repo = avails_repo

    async def execute(self, data: AvailsDto) -> AvailsDto:
        """
        Executa o caso de uso de criação/atualização de disponibilidades.
        
        Args:
            data: DTO com as disponibilidades a serem criadas
            
        Returns:
            AvailsDto: Disponibilidades criadas
            
        Raises:
            ValueError: Se o evento não existir ou se os horários forem inválidos
        """
        self._validate_availabilities(data.availability)
        
        await self._delete_existing_availabilities(data.event_id)
        await self._create_new_availabilities(data)
        
        return data

    def _validate_availabilities(self, availabilities: List[Availability]) -> None:
        """Valida os horários e dias da semana das disponibilidades."""
        for avail in availabilities:
            if avail.week_day not in self.VALID_WEEK_DAYS:
                raise ValueError(f'Dia da semana inválido: {avail.week_day}')
            
            start = avail.start_time
            end = avail.end_time
            
            if start >= end:
                raise ValueError(
                    f'Horário inicial ({avail.start_time}) deve ser menor que o '
                    f'horário final ({avail.end_time})'
                )

    async def _delete_existing_availabilities(self, event_id: str) -> None:
        """Remove as disponibilidades existentes do evento."""
        await self.avails_repo.delete_by_event_id(event_id)

    async def _create_new_availabilities(self, data: AvailsDto) -> None:
        """Cria as novas disponibilidades."""
        for availability in data.availability:
            new_avails = Avails(
                event_id=data.event_id,
                week_day=availability.week_day,
                start_time=availability.start_time,
                end_time=availability.end_time
            )
            await self.avails_repo.save(new_avails)

    # @staticmethod
    # def _parse_time_str(time_value: str | time) -> time:
    #     """
    #     Converte uma string de hora (HH:MM:SS) ou um objeto time para um objeto time.
        
    #     Args:
    #         time_value: String no formato HH:MM:SS ou objeto datetime.time
            
    #     Returns:
    #         datetime.time: Objeto time parseado
            
    #     Raises:
    #         ValueError: Se o formato da string for inválido
    #     """
    #     if isinstance(time_value, time):
    #         return time_value
            
    #     try:
    #         hour, minute, second = map(int, str(time_value).split(':'))
    #         return time(hour, minute, second)
    #     except (ValueError, TypeError):
    #         raise ValueError(f'Formato de hora inválido: {time_value}. Use o formato HH:MM:SS')
