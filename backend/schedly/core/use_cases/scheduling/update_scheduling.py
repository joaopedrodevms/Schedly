from infra.repositories.scheduling_repository import SchedulingRepository, Scheduling


class UpdateScheduling:
    def __init__(self, scheduling_repo: SchedulingRepository):
        self.scheduling_repo = scheduling_repo

    async def execute(self, scheduling_id: str, **kwargs) -> Scheduling:
        # Obtém  pelo ID
        scheduling = await self.scheduling_repo.get_by_id(scheduling_id)

        if not scheduling:
            raise ValueError('Scheduling não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(scheduling, key):
                setattr(scheduling, key, value)

        return await self.scheduling_repo.update(scheduling)
