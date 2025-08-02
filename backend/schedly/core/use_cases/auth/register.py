from infra.security.jwt_handler import create_access_token
from interface.schemas.User import UserPublicDto
from core.models.user import User
from utils.password import hash_password
from interface.schemas.Auth import RegisterRequestDto, RegisterResponseDto
from infra.repositories.user_repository import UserRepository

class Register:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, data: RegisterRequestDto) -> RegisterResponseDto:
        new_user = User(
            name=data.name,
            email=data.email,
            slug=data.slug,
            password=data.password,
            timezone="America/Sao_Paulo",
            is_active=True,
            email_verified=False,
            avatar_url="",
            cover_url="",
        )

        if await self.user_repo.get_by_email(new_user.email):
            raise ValueError("Invalid email")

        if await self.user_repo.get_by_slug(new_user.slug):
            raise ValueError("Invalid slug")

        new_user.password = hash_password(new_user.password)

        user = await self.user_repo.save(new_user)

        return RegisterResponseDto(
            user=UserPublicDto.model_validate(user.model_dump()),
            access_token=create_access_token(user.id),
            token_type="bearer"
        )