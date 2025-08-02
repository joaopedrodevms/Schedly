from datetime import datetime, timedelta
from interface.schemas.Scheduling import SchedulingCreateRequestDto, SchedulingDto
from infra.repositories.event_repository import EventRepository
from infra.repositories.avails_repository import AvailsRepository
from infra.repositories.scheduling_repository import SchedulingRepository, Scheduling


class CreateScheduling:
    def __init__(self, scheduling_repo: SchedulingRepository, event_repo: EventRepository, avail_repo: AvailsRepository):
        self.scheduling_repo = scheduling_repo
        self.event_repo = event_repo
        self.avail_repo = avail_repo

    async def execute(self, data: SchedulingCreateRequestDto) -> SchedulingDto:
        # 1. Validar se o event_id existe
        event = await self.event_repo.get_by_id(data.event_id)
        if not event:
            raise ValueError('Event not found')
        
        # 2. Calcular o horário de término baseado na duração do evento
        ends_at = data.starts_at + timedelta(minutes=event.duration_minutes)
        
        # 3. Buscar os avails do evento
        avails = await self.avail_repo.get_by_event_id(data.event_id)
        if not avails:
            raise ValueError('No availability windows found for this event')
        
        # 4. Verificar se o horário está dentro de uma janela disponível
        print("Data original:", data.starts_at)
        print("Tipo da data:", type(data.starts_at))
        
        scheduling_date = data.starts_at.date()
        scheduling_start_time = data.starts_at.time()
        scheduling_end_time = ends_at.time()
        week_day = scheduling_date.weekday()
        
        print("Avails:", avails)
        print("Data do agendamento:", scheduling_date)
        print("Dia da semana (0=Segunda, 6=Domingo):", week_day)
        print("Hora início:", scheduling_start_time)
        print("Hora fim:", scheduling_end_time)
        print("Timestamp completo:", data.starts_at.isoformat())

        is_valid_time = False
        for avail in avails:
            if (avail.week_day == week_day and
                avail.start_time <= scheduling_start_time and
                avail.end_time >= scheduling_end_time):
                is_valid_time = True
                break
        
        if not is_valid_time:
            raise ValueError('The selected time is not within any available window')
        
        # 5. Aplicar os buffers ao horário escolhido
        buffer_start = data.starts_at - timedelta(minutes=event.buffer_before)
        buffer_end = ends_at + timedelta(minutes=event.buffer_after)
        
        # 6. Verificar se já existe um agendamento no intervalo
        existing_scheduling = await self.scheduling_repo.get_conflicting_scheduling(
            event_id=data.event_id,
            start_time=buffer_start,
            end_time=buffer_end
        )
        
        if existing_scheduling:
            raise ValueError('There is already a scheduling in this time slot')
        
        # 7. Salvar o agendamento
        new_scheduling = Scheduling(
            event_id=data.event_id,
            quest_name=data.quest_name,
            quest_email=data.quest_email,
            quest_message=data.quest_message,
            starts_at=data.starts_at,
            ends_at=ends_at
        )
        
        return await self.scheduling_repo.save(new_scheduling)
