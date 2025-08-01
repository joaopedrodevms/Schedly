from .infra.repositories.token_repository import TokenRepository


class DeleteToken:
    def __init__(self, token_repo: TokenRepository):
        self.token_repo = token_repo

    async def execute(self, token_id: int) -> None:
        await self.token_repo.delete(token_id)
