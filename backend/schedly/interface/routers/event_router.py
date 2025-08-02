from infra.repositories.avails_repository import AvailsRepository
from interface.schemas.Event import EventCreateRequestDto, EventDto, EventUpdateRequestDto
from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.event_repository import EventRepository
from infra.repositories.user_repository import UserRepository
from infra.repositories.scheduling_repository import SchedulingRepository
from interface.service.event_service import EventService

from interface.middleware.jwt_bearer import JWTBearer

router = APIRouter(
    prefix="/events",
    dependencies=[Depends(JWTBearer())]
)


@router.get("", response_model=list[EventDto], tags=["Events"], operation_id="get_event")
async def get_event(
    event_id: str = None,
    token_user_id: str = Depends(JWTBearer()),
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    user_repo = UserRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    scheduling_repo = SchedulingRepository(db_session)
    service = EventService(repo, user_repo, avail_repo, scheduling_repo)

    if event_id:
        event = await service.get_by_id(event_id)
    else:
        event = await service.get_by_user_id(token_user_id)

    if not event:
        raise HTTPException(status_code=404, detail="Event não encontrado")

    return event


@router.post("", response_model=EventDto, tags=["Events"], operation_id="create_event")
async def create_event(
    data: EventCreateRequestDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    user_repo = UserRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    scheduling_repo = SchedulingRepository(db_session)
    service = EventService(repo, user_repo, avail_repo, scheduling_repo)
    event = await service.create(data)
    return event


@router.put("", response_model=EventDto, tags=["Events"], operation_id="update_event")
async def update_event(
    token_user_id: str = Depends(JWTBearer()),
    data: EventUpdateRequestDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = EventRepository(db_session)
    user_repo = UserRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    scheduling_repo = SchedulingRepository(db_session)
    service = EventService(repo, user_repo, avail_repo, scheduling_repo)
    return await service.update(data, token_user_id)


@router.delete("", response_model=EventDto, tags=["Events"], operation_id="delete_event")
async def delete_event(
    event_id: str, db_session=Depends(get_pg_session)
):
    repo = EventRepository(db_session)
    user_repo = UserRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    scheduling_repo = SchedulingRepository(db_session)
    service = EventService(repo, user_repo, avail_repo, scheduling_repo)
    return await service.delete(event_id)
