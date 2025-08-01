from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.user_repository import UserRepository
from core.models.user import UserCreateSchema, UserUpdateSchema, User
from interface.service.user_service import UserService

router = APIRouter(prefix="/users")


@router.get("", response_model=User)
async def get_user(
    user_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = UserService(repo)

    if user_id:
        user = await service.get_by_id(user_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not user:
        raise HTTPException(status_code=404, detail="User não encontrado")

    return user


@router.post("", response_model=User)
async def create_user(
    data: UserCreateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = UserService(repo)
    user = await service.create(**data.model_dump())
    return user


@router.put("", response_model=User)
async def update_user(
    data: UserUpdateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    service = UserService(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update(user_id=data.id, **update_data)


@router.delete("")
async def delete_user(user_id: str, db_session=Depends(get_pg_session)):
    repo = UserRepository(db_session)
    service = UserService(repo)
    return await service.delete(user_id)
