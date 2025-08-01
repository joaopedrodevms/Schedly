from infra.repositories.user_repository import UserRepository


class DeleteUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, user_id: int) -> None:
        await self.user_repo.delete(user_id)
