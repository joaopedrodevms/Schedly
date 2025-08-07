from schedly.infra.storage.storage_service import StorageService
from fastapi import APIRouter, Body, Depends, File, UploadFile
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from schedly.infra.database import get_pg_session
from schedly.infra.repositories.user_repository import UserRepository
from schedly.core.models.user import User
from schedly.interface.schemas.User import UserPublicDto, UserUpdatePhotoRequestDto, UserUpdateRequestDto, UserValidateSlugResponseDto
from schedly.interface.service.user_service import UserService
from schedly.interface.exceptions.photo_exceptions import PhotoUpdateException

from schedly.interface.middleware.jwt_bearer import JWTBearer

router = APIRouter(
    prefix="/users",
    dependencies=[Depends(JWTBearer())]
)


@router.get("", response_model=UserPublicDto, tags=["Users"], operation_id="get_user")
async def get_user(
    token_user_id: str = Depends(JWTBearer()),
    db_session: Session = Depends(get_pg_session),
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)

    user = await service.get(token_user_id)

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
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    return await service.update(user_id=token_user_id, data=data)

@router.delete("", response_model=UserPublicDto, tags=["Users"], operation_id="delete_user")
async def delete_user(
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    return await service.delete(token_user_id)


@router.post("/avatar", response_model=UserPublicDto, tags=["Users"], operation_id="update_avatar")
async def update_avatar(
    file: UploadFile,
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    try:
        return await service.update_avatar(token_user_id, file)
    except PhotoUpdateException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao atualizar foto de perfil")


@router.delete("/avatar", response_model=UserPublicDto, tags=["Users"], operation_id="remove_avatar")
async def remove_avatar(
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    try:
        return await service.remove_avatar(token_user_id)
    except PhotoUpdateException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao remover foto de perfil")

@router.post("/cover", response_model=UserPublicDto, tags=["Users"], operation_id="update_cover")
async def update_cover(
    file: UploadFile,
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    try:
        return await service.update_cover(token_user_id, file)
    except PhotoUpdateException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao atualizar foto de capa")

@router.delete("/cover", response_model=UserPublicDto, tags=["Users"], operation_id="remove_cover")
async def remove_cover(
    token_user_id: str = Depends(JWTBearer()),
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    try:
        return await service.remove_cover(token_user_id)
    except PhotoUpdateException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao remover foto de capa")

@router.get("/validate-slug", response_model=UserValidateSlugResponseDto, tags=["Users"], operation_id="validate_slug")
async def validate_slug(
    slug: str = None,
    db_session=Depends(get_pg_session)
):
    repo = UserRepository(db_session)
    storage_service = StorageService()
    service = UserService(repo, storage_service)
    return await service.validate_slug(slug)