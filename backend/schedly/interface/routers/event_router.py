from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.event_repository import EventRepository
from core.models.event import EventCreateSchema, EventUpdateSchema, Event
from interface.service.event_service import EventService

router = APIRouter(prefix="/events")
# TODO: adicionar router em app.py


@router.get("", response_model=Event)
async def get_event(
    event_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    service = EventService(repo)

    if event_id:
        event = await service.get_by_id(event_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not event:
        raise HTTPException(status_code=404, detail="Event não encontrado")

    return event


@router.post("", response_model=Event)
async def create_event(
    data: EventCreateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    service = EventService(repo)
    event = await service.create(**data.model_dump())
    return event


@router.put("", response_model=Event)
async def update_event(
    data: EventUpdateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    service = EventService(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update(event_id=data.id, **update_data)


@router.delete("")
async def delete_event(event_id: str, db_session=Depends(get_pg_session)):
    repo = EventRepository(db_session)
    service = EventService(repo)
    return await service.delete(event_id)
