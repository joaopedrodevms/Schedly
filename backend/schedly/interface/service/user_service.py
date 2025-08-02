import uuid
from core.use_cases.user import (
    DeleteUser,
    GetUser,
    UpdateUser,
)
from infra.repositories.user_repository import UserRepository
from interface.schemas.User import UserPublicDto


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def get_current_user(self, token_user_id: uuid.UUID) -> UserPublicDto | None:
        use_case = GetUser(self.repo)
        return await use_case.get_current_user(token_user_id)

    async def update(self, token_user_id: uuid.UUID, **kwargs) -> UserPublicDto:
        use_case = UpdateUser(self.repo)
        return await use_case.execute(token_user_id=token_user_id, **kwargs)

    async def delete(self, token_user_id: uuid.UUID) -> UserPublicDto:
        use_case = DeleteUser(self.repo)
        return await use_case.execute(token_user_id)
