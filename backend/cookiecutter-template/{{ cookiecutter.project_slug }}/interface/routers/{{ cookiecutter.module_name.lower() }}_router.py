from fastapi import APIRouter, Body, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from splice.infra.database import get_pg_session
from splice.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository
from splice.core.models.{{ cookiecutter.module_name.lower() }} import {{ cookiecutter.module_name.capitalize() }}CreateSchema, {{ cookiecutter.module_name.capitalize() }}UpdateSchema, {{ cookiecutter.module_name.capitalize() }}
from splice.interface.service.{{ cookiecutter.module_name.lower() }}_service import {{ cookiecutter.module_name.capitalize() }}Service

router = APIRouter(prefix="/{{ cookiecutter.module_name.lower() }}s")
# TODO: adicionar router em app.py


@router.get("", response_model={{ cookiecutter.module_name.capitalize() }})
async def get_{{ cookiecutter.module_name.lower() }}(
    {{ cookiecutter.module_name.lower() }}_id: str = None,
    db_session: Session = Depends(get_pg_session),
):
    repo = {{ cookiecutter.module_name.capitalize() }}Repository(db_session)
    service = {{ cookiecutter.module_name.capitalize() }}Service(repo)

    if {{ cookiecutter.module_name.lower() }}_id:
        {{ cookiecutter.module_name.lower() }} = await service.get_by_id({{ cookiecutter.module_name.lower() }}_id)
    else:
        raise HTTPException(
            status_code=400, detail="Parâmetro de consulta necessário"
        )

    if not {{ cookiecutter.module_name.lower() }}:
        raise HTTPException(status_code=404, detail="{{ cookiecutter.module_name.capitalize() }} não encontrado")

    return {{ cookiecutter.module_name.lower() }}


@router.post("", response_model={{ cookiecutter.module_name.capitalize() }})
async def create_{{ cookiecutter.module_name.lower() }}(
    data: {{ cookiecutter.module_name.capitalize() }}CreateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = {{ cookiecutter.module_name.capitalize() }}Repository(db_session)
    service = {{ cookiecutter.module_name.capitalize() }}Service(repo)
    {{ cookiecutter.module_name.lower() }} = await service.create(**data.model_dump())
    return {{ cookiecutter.module_name.lower() }}


@router.put("", response_model={{ cookiecutter.module_name.capitalize() }})
async def update_{{ cookiecutter.module_name.lower() }}(
    data: {{ cookiecutter.module_name.capitalize() }}UpdateSchema = Body(),  # type: ignore
    db_session: Session = Depends(get_pg_session),
):
    repo = {{ cookiecutter.module_name.capitalize() }}Repository(db_session)
    service = {{ cookiecutter.module_name.capitalize() }}Service(repo)

    # Converte o body em dicionário, removendo campos nulos
    update_data = data.model_dump(exclude_unset=True)

    # Passa os dados descompactados para a função de atualização
    return await service.update({{ cookiecutter.module_name.lower() }}_id=data.id, **update_data)


@router.delete("")
async def delete_{{ cookiecutter.module_name.lower() }}({{ cookiecutter.module_name.lower() }}_id: str, db_session=Depends(get_pg_session)):
    repo = {{ cookiecutter.module_name.capitalize() }}Repository(db_session)
    service = {{ cookiecutter.module_name.capitalize() }}Service(repo)
    return await service.delete({{ cookiecutter.module_name.lower() }}_id)
