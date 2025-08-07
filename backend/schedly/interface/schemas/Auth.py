from pydantic import BaseModel, EmailStr
from schedly.interface.schemas.User import UserPublicDto

class LoginRequestDto(BaseModel):
    email: EmailStr
    password: str

class LoginResponseDto(BaseModel):
    user: UserPublicDto
    access_token: str
    token_type: str = 'bearer'

class RegisterRequestDto(BaseModel):
    name: str
    email: EmailStr
    password: str
    slug: str

class RegisterResponseDto(BaseModel):
    user: UserPublicDto
    access_token: str
    token_type: str = 'bearer'