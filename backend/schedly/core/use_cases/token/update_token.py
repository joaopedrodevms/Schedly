from .infra.repositories.token_repository import TokenRepository, Token


class UpdateToken:
    def __init__(self, token_repo: TokenRepository):
        self.token_repo = token_repo

    async def execute(self, token_id: str, **kwargs) -> Token:
        # Obtém  pelo ID
        token = await self.token_repo.get_by_id(token_id)

        if not token:
            raise ValueError('Token não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(token, key):
                setattr(token, key, value)

        return await self.token_repo.save(token)
