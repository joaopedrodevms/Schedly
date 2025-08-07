from infra.repositories.avails_repository import AvailsRepository
from infra.repositories.event_repository import EventRepository
from interface.schemas.Scheduling import SchedulingCreateRequestDto, SchedulingDto, SchedulingUpdateRequestDto
from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.scheduling_repository import SchedulingRepository
from core.models.scheduling import Scheduling
from interface.service.scheduling_service import SchedulingService

from interface.middleware.jwt_bearer import JWTBearer

router = APIRouter(
    prefix="/scheduling",
    dependencies=[Depends(JWTBearer())]
)


@router.get("", response_model=list[SchedulingDto], tags=["Schedulings"], operation_id="get_scheduling")
async def get_scheduling(
    scheduling_id: str = None,
    token_user_id: str = Depends(JWTBearer()),
    db_session: Session = Depends(get_pg_session),
):
    repo = SchedulingRepository(db_session)
    event_repo = EventRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    service = SchedulingService(repo, event_repo, avail_repo)

    if scheduling_id:
        scheduling = await service.get_by_id(scheduling_id)
    else:
        scheduling = await service.get_by_user_id(token_user_id)

    # if not scheduling:
        # raise HTTPException(status_code=404, detail="Scheduling não encontrado")

    return scheduling


@router.post("", response_model=SchedulingDto, tags=["Schedulings"], operation_id="create_scheduling")
async def create_scheduling(
    data: SchedulingCreateRequestDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = SchedulingRepository(db_session)
    event_repo = EventRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    service = SchedulingService(repo, event_repo, avail_repo)
    scheduling = await service.create(data)
    return scheduling


@router.put("", response_model=SchedulingDto, tags=["Schedulings"], operation_id="update_scheduling")
async def update_scheduling(
    data: SchedulingUpdateRequestDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = SchedulingRepository(db_session)
    event_repo = EventRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    service = SchedulingService(repo, event_repo, avail_repo)

    return await service.update(scheduling_id=data.id, data=data)


@router.delete("", tags=["Schedulings"], operation_id="delete_scheduling")
async def delete_scheduling(scheduling_id: str, db_session=Depends(get_pg_session)):
    repo = SchedulingRepository(db_session)
    event_repo = EventRepository(db_session)
    avail_repo = AvailsRepository(db_session)
    service = SchedulingService(repo, event_repo, avail_repo)
    return await service.delete(scheduling_id)
