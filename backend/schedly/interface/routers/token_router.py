from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from .infra.database import get_pg_session
from .infra.repositories.token_repository import TokenRepository
from .core.models.token import TokenCreateSchema, TokenUpdateSchema, Token
from .interface.service.token_service import TokenService

router = APIRouter(prefix="/tokens")
# TODO: adicionar router em app.py


@router.get("", response_model=Token)
async def get_token(
    token_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = TokenRepository(db_session)
    service = TokenService(repo)

    if token_id:
        token = await service.get_by_id(token_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not token:
        raise HTTPException(status_code=404, detail="Token não encontrado")

    return token


@router.post("", response_model=Token)
async def create_token(
    data: TokenCreateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = TokenRepository(db_session)
    service = TokenService(repo)
    token = await service.create(**data.model_dump())
    return token


@router.put("", response_model=Token)
async def update_token(
    data: TokenUpdateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = TokenRepository(db_session)
    service = TokenService(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update(token_id=data.id, **update_data)


@router.delete("")
async def delete_token(token_id: str, db_session=Depends(get_pg_session)):
    repo = TokenRepository(db_session)
    service = TokenService(repo)
    return await service.delete(token_id)
