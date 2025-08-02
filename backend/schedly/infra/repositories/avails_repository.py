from sqlalchemy.future import select
from sqlalchemy.orm import Session
import uuid

from core.models.avails import Avails


class AvailsRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, avails: Avails) -> Avails:
        await self.db_session.merge(avails)
        await self.db_session.commit()
        return avails

    async def update(self, avails: Avails) -> Avails:
        await self.db_session.merge(avails)
        await self.db_session.commit()
        await self.db_session.refresh(avails)
        return avails

    async def get_by_id(self, avails_id: uuid.UUID) -> Avails | None:
        statement = select(Avails).filter_by(id=avails_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def get_by_event_id(self, event_id: uuid.UUID) -> list[Avails]:
        statement = select(Avails).filter_by(event_id=event_id)
        result = await self.db_session.execute(statement)
        return [row[0] for row in result.all()]

    async def delete(self, avails_id: uuid.UUID) -> Avails:
        statement = select(Avails).filter_by(id=avails_id)
        avails = (
            await self.db_session.execute(statement)
        ).scalar_one_or_none()
        if avails:
            await self.db_session.delete(avails)
            await self.db_session.commit()
        return avails
    
    async def delete_by_event_id(self, event_id: uuid.UUID) -> None:
        statement = select(Avails).filter_by(event_id=event_id)
        result = await self.db_session.execute(statement)
        avails_list = [row[0] for row in result.all()]
        for avails in avails_list:
            await self.db_session.delete(avails)
        await self.db_session.commit()
