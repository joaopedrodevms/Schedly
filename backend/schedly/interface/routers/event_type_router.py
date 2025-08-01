from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.event_type_repository import EventTypeRepository
from core.models.event_type import (
    EventTypeCreateSchema,
    EventTypeUpdateSchema,
    EventType,
)
from interface.service.event_type_service import EventTypeService

router = APIRouter(prefix="/event_types")
# TODO: adicionar router em app.py


@router.get("", response_model=EventType)
async def get_event_type(
    event_type_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = EventTypeRepository(db_session)
    service = EventTypeService(repo)

    if event_type_id:
        event_type = await service.get_by_id(event_type_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not event_type:
        raise HTTPException(status_code=404, detail="EventType não encontrado")

    return event_type


@router.post("", response_model=EventType)
async def create_event_type(
    data: EventTypeCreateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventTypeRepository(db_session)
    service = EventTypeService(repo)
    event_type = await service.create(**data.model_dump())
    return event_type


@router.put("", response_model=EventType)
async def update_event_type(
    data: EventTypeUpdateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventTypeRepository(db_session)
    service = EventTypeService(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update(event_type_id=data.id, **update_data)


@router.delete("")
async def delete_event_type(
    event_type_id: str, db_session=Depends(get_pg_session)
):
    repo = EventTypeRepository(db_session)
    service = EventTypeService(repo)
    return await service.delete(event_type_id)
