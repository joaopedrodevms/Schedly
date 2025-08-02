from interface.schemas.User import UserPublicDto
from infra.repositories.user_repository import UserRepository


class UpdateUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, token_user_id: str, **kwargs) -> UserPublicDto:
        # Obtém  pelo ID
        user = await self.user_repo.get_by_id(token_user_id)

        if not user:
            raise ValueError('User não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr(user, key):
                setattr(user, key, value)

        updated_user = await self.user_repo.update(user)
        return UserPublicDto(**updated_user.model_dump())
