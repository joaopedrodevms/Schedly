from sqlalchemy.future import select
from sqlalchemy.orm import Session

from .core.models.token import Token


class TokenRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, token: Token) -> Token:
        await self.db_session.merge(token)
        await self.db_session.commit()
        return token

    async def get_by_id(self, token_id: int) -> Token | None:
        statement = select(Token).filter_by(id=token_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def delete(self, token_id: int) -> None:
        statement = select(Token).filter_by(id=token_id)
        token = (await self.db_session.execute(statement)).scalar_one_or_none()
        if token:
            await self.db_session.delete(token)
            await self.db_session.commit()
