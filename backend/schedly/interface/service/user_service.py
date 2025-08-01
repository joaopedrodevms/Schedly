# app/api/services/user_service.py
from core.use_cases.user import (
    CreateUser,
    DeleteUser,
    GetUser,
    UpdateUser,
)
from infra.repositories.user_repository import UserRepository, User


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def create(self, **kwargs) -> User:
        use_case = CreateUser(self.repo)
        return await use_case.execute(**kwargs)

    async def get_by_id(self, user_id: int) -> User | None:
        use_case = GetUser(self.repo)
        return await use_case.get_by_id(user_id)

    async def update(self, user_id: int, **kwargs) -> User:
        use_case = UpdateUser(self.repo)
        return await use_case.execute(user_id=user_id, **kwargs)

    async def delete(self, user_id: int) -> None:
        use_case = DeleteUser(self.repo)
        return await use_case.execute(user_id)
