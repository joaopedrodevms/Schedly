from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.user_repository import UserRepository
from core.models.user import User
from interface.schemas.User import UserPublicDto, UserUpdateRequestDto
from interface.service.user_service import UserService

from interface.middleware.jwt_bearer import JWTBearer

router = APIRouter(
    prefix="/users",
    dependencies=[Depends(JWTBearer())]
)


@router.get("", response_model=UserPublicDto, tags=["Users"], operation_id="get_current_user")
async def get_current_user(
    token_user_id: str = Depends(JWTBearer()),
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = UserService(repo)

    user = await service.get_current_user(token_user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return user

@router.put("", response_model=UserPublicDto, tags=["Users"], operation_id="update_user")
async def update_user(
    token_user_id: str = Depends(JWTBearer()),
    data: UserUpdateRequestDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = UserService(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update(token_user_id=token_user_id, **update_data)


@router.delete("", response_model=UserPublicDto, tags=["Users"], operation_id="delete_user")
async def delete_user(
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    service = UserService(repo)
    return await service.delete(token_user_id)
