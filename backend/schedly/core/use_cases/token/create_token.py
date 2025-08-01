from .infra.repositories.token_repository import TokenRepository, Token


class CreateToken:
    def __init__(self, token_repo: TokenRepository):
        self.token_repo = token_repo

    async def execute(self, **kwargs) -> Token:
        new_token = Token(**kwargs)
        return await self.token_repo.save(new_token)
