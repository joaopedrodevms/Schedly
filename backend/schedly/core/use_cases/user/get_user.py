import uuid
from interface.schemas.User import UserPublicDto
from infra.repositories.user_repository import UserRepository


class GetUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, token_user_id: uuid.UUID) -> UserPublicDto | None:
        user = await self.user_repo.get_by_id(token_user_id)
        if not user:
            return None
        return UserPublicDto(**user.model_dump())
