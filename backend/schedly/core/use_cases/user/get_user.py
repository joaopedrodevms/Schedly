from infra.repositories.user_repository import UserRepository, User


class GetUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_by_id(self, user_id: int) -> User | None:
        return await self.user_repo.get_by_id(user_id)
