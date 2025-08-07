from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schedly.infra.database import get_pg_session
from schedly.infra.repositories.user_repository import UserRepository
from schedly.interface.schemas.Auth import LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto
from schedly.interface.service.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login", response_model=LoginResponseDto, operation_id="login")
async def login(
    data: LoginRequestDto,
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = AuthService(repo)
    return await service.login(data)

@router.post("/register", response_model=RegisterResponseDto, operation_id="register")
async def register(
    data: RegisterRequestDto,
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = AuthService(repo)
    return await service.register(data)