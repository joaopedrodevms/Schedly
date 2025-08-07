from sqlalchemy.future import select
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from schedly.core.models.scheduling import Scheduling


class SchedulingRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, scheduling: Scheduling) -> Scheduling:
        await self.db_session.merge(scheduling)
        await self.db_session.commit()
        return scheduling

    async def update(self, scheduling: Scheduling) -> Scheduling:
        await self.db_session.merge(scheduling)
        await self.db_session.commit()
        await self.db_session.refresh(scheduling)
        return scheduling

    async def get_by_id(self, scheduling_id: uuid.UUID) -> Scheduling | None:
        statement = select(Scheduling).filter_by(id=scheduling_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def get_by_event_id(self, event_id: uuid.UUID) -> list[Scheduling]:
        statement = select(Scheduling).filter_by(event_id=event_id)
        return (await self.db_session.execute(statement)).scalars().all()

    async def get_conflicting_scheduling(
        self,
        event_id: uuid.UUID,
        start_time: datetime,
        end_time: datetime
    ) -> Scheduling | None:
        statement = select(Scheduling).filter(
            Scheduling.event_id == event_id,
            Scheduling.starts_at < end_time,
            Scheduling.ends_at > start_time
        )
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def delete(self, scheduling_id: uuid.UUID) -> Scheduling:
        statement = select(Scheduling).filter_by(id=scheduling_id)
        scheduling = (await self.db_session.execute(statement)).scalar_one_or_none()
        if scheduling:
            await self.db_session.delete(scheduling)
            await self.db_session.commit()
        return scheduling
    
    async def delete_by_event_id(self, event_id: uuid.UUID) -> None:
        statement = select(Scheduling).filter_by(event_id=event_id)
        result = await self.db_session.execute(statement)
        scheduling_list = [row[0] for row in result.all()]
        for scheduling in scheduling_list:
            await self.db_session.delete(scheduling)
        await self.db_session.commit()
