from schedly.interface.schemas.Auth import LoginRequestDto, LoginResponseDto
from schedly.interface.schemas.User import UserPublicDto
from schedly.infra.repositories.user_repository import UserRepository
from schedly.infra.security.jwt_handler import create_access_token
from schedly.utils.password import verify_password
from schedly.interface.exceptions.custom_exceptions import AuthenticationException, BusinessException


class Login:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, data: LoginRequestDto) -> LoginResponseDto:
        try:
            user = await self.user_repo.get_by_email(data.email)
            if not user or not verify_password(data.password, user.password):
                raise AuthenticationException("Email or password is incorrect")

            return LoginResponseDto(
                user=UserPublicDto(**user.model_dump()),
                access_token=create_access_token(user.id),
                token_type="bearer"
            )
        except AuthenticationException as e:
            raise e
        except Exception as e:
            raise BusinessException(f"Erro ao realizar login: {str(e)}")