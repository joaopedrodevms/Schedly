import uuid
from schedly.interface.schemas.User import UserPublicDto
from schedly.infra.repositories.user_repository import UserRepository


class DeleteUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, token_user_id: uuid.UUID) -> UserPublicDto:
        user = await self.user_repo.delete(token_user_id)
        return UserPublicDto(**user.model_dump())
