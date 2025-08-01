from .infra.repositories.token_repository import TokenRepository, Token


class GetToken:
    def __init__(self, token_repo: TokenRepository):
        self.token_repo = token_repo

    async def get_by_id(self, token_id: int) -> Token | None:
        return await self.token_repo.get_by_id(token_id)
