from sqlalchemy.future import select
from sqlalchemy.orm import Session
import uuid

from core.models.event import Event


class EventRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, event: Event) -> Event:
        await self.db_session.merge(event)
        await self.db_session.commit()
        return event

    async def update(self, event: Event) -> Event:
        await self.db_session.merge(event)
        await self.db_session.commit()
        await self.db_session.refresh(event)
        return event

    async def get_by_id(self, event_id: uuid.UUID) -> Event | None:
        statement = select(Event).filter_by(id=event_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def get_by_user_id(self, user_id: uuid.UUID) -> list[Event]:
        statement = select(Event).filter_by(user_id=user_id)
        return (await self.db_session.execute(statement)).scalars().all()

    async def get_slugs_by_user_id(self, user_id: uuid.UUID) -> list[str]:
        statement = select(Event.slug).filter_by(user_id=user_id)
        result = await self.db_session.execute(statement)
        return [row[0] for row in result.all()]

    async def delete(self, event_id: uuid.UUID) -> Event:
        statement = select(Event).filter_by(id=event_id)
        event = (
            await self.db_session.execute(statement)
        ).scalar_one_or_none()
        if event:
            await self.db_session.delete(event)
            await self.db_session.commit()
        return event
