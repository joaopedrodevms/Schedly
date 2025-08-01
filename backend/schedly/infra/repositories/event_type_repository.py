from sqlalchemy.future import select
from sqlalchemy.orm import Session

from core.models.event_type import EventType


class EventTypeRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, event_type: EventType) -> EventType:
        await self.db_session.merge(event_type)
        await self.db_session.commit()
        return event_type

    async def get_by_id(self, event_type_id: int) -> EventType | None:
        statement = select(EventType).filter_by(id=event_type_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def delete(self, event_type_id: int) -> None:
        statement = select(EventType).filter_by(id=event_type_id)
        event_type = (
            await self.db_session.execute(statement)
        ).scalar_one_or_none()
        if event_type:
            await self.db_session.delete(event_type)
            await self.db_session.commit()
