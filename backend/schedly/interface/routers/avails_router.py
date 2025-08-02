from interface.schemas.Avails import AvailsDto
from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from infra.database import get_pg_session
from infra.repositories.avails_repository import AvailsRepository
from interface.service.avails_service import AvailsService

from interface.middleware.jwt_bearer import JWTBearer

router = APIRouter(
    prefix="/avails",
    dependencies=[Depends(JWTBearer())]
)


@router.get("", response_model=AvailsDto, tags=["Avails"], operation_id="get_avails")
async def get_avails(
    event_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = AvailsRepository(db_session)
    service = AvailsService(repo)

    if event_id:
        avails = await service.get_by_event_id(event_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not avails:
        raise HTTPException(status_code=404, detail="Avails não encontrado")

    return avails


@router.post("", response_model=AvailsDto, tags=["Avails"], operation_id="create_avails")
async def create_avails(
    data: AvailsDto = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = AvailsRepository(db_session)
    service = AvailsService(repo)
    avails = await service.create(data)
    return avails
