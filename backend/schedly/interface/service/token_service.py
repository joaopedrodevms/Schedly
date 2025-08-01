# app/api/services/token_service.py
from .core.use_cases.token import (
    CreateToken,
    DeleteToken,
    GetToken,
    UpdateToken
)
from .infra.repositories.token_repository import TokenRepository, Token


class TokenService:
    def __init__(self, repo: TokenRepository):
        self.repo = repo

    async def create(self, **kwargs) -> Token:
        use_case = CreateToken(self.repo)
        return await use_case.execute(**kwargs)

    async def get_by_id(self, token_id: int) -> Token | None:
        use_case = GetToken(self.repo)
        return await use_case.get_by_id(token_id)

    async def update(self, token_id: int, **kwargs) -> Token:
        use_case = UpdateToken(self.repo)
        return await use_case.execute(token_id=token_id, **kwargs)

    async def delete(self, token_id: int) -> None:
        use_case = DeleteToken(self.repo)
        return await use_case.execute(token_id)
