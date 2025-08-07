from schedly.infra.repositories.user_repository import UserRepository
from schedly.core.use_cases.auth.login import Login
from schedly.core.use_cases.auth.register import Register
from schedly.interface.schemas.Auth import LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def login(self, data: LoginRequestDto) -> LoginResponseDto:
        use_case = Login(self.user_repo)
        return await use_case.execute(data)
    
    async def register(self, data: RegisterRequestDto) -> RegisterResponseDto:
        use_case = Register(self.user_repo)
        return await use_case.execute(data)