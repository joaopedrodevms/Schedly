from infra.repositories.user_repository import UserRepository, User


class CreateUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, **kwargs) -> User:
        new_user = User(**kwargs)
        return await self.user_repo.save(new_user)
