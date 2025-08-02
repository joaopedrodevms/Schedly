from interface.schemas.Auth import LoginRequestDto, LoginResponseDto
from interface.schemas.User import UserPublicDto
from infra.repositories.user_repository import UserRepository
from infra.security.jwt_handler import create_access_token
from utils.password import verify_password

class Login:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, data: LoginRequestDto) -> LoginResponseDto:
        user = await self.user_repo.get_by_email(data.email)
        if not user or not verify_password(data.password, user.password):
            raise Exception("Invalid email or password")

        return LoginResponseDto(
            user=UserPublicDto(**user.model_dump()),
            access_token=create_access_token(user.id),
            token_type="bearer"
        )