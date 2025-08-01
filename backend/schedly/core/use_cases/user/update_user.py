from infra.repositories.user_repository import UserRepository, User


class UpdateUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, user_id: str, **kwargs) -> User:
        # Obtém  pelo ID
        user = await self.user_repo.get_by_id(user_id)

        if not user:
            raise ValueError('User não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(user, key):
                setattr(user, key, value)

        return await self.user_repo.save(user)
