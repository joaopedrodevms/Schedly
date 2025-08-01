from sqlalchemy.future import select
from sqlalchemy.orm import Session

from core.models.user import User


class UserRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, user: User) -> User:
        await self.db_session.merge(user)
        await self.db_session.commit()
        return user

    async def get_by_id(self, user_id: int) -> User | None:
        statement = select(User).filter_by(id=user_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def delete(self, user_id: int) -> None:
        statement = select(User).filter_by(id=user_id)
        user = (await self.db_session.execute(statement)).scalar_one_or_none()
        if user:
            await self.db_session.delete(user)
            await self.db_session.commit()
