from interface.schemas.Avails import AvailsDto, Availability
from schedly.infra.repositories.avails_repository import AvailsRepository, Avails
import uuid


class GetAvailsByEventId:
    def __init__(self, avails_repo: AvailsRepository):
        self.avails_repo = avails_repo

    async def get_by_event_id(self, event_id: uuid.UUID) -> AvailsDto | None:
        avails_list = await self.avails_repo.get_by_event_id(event_id)
        if not avails_list:
            return None

        availability_list = [
            Availability(
                week_day=avail.week_day,
                start_time=avail.start_time,
                end_time=avail.end_time
            )
            for avail in avails_list
        ]

        return AvailsDto(
            event_id=event_id,
            availability=availability_list
        )
