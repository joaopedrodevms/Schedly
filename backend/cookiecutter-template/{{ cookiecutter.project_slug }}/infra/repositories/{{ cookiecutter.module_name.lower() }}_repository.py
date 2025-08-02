from sqlalchemy.future import select
from sqlalchemy.orm import Session

from schedly.core.models.{{ cookiecutter.module_name.lower() }} import {{ cookiecutter.module_name.capitalize() }}


class {{ cookiecutter.module_name.capitalize() }}Repository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def save(self, {{ cookiecutter.module_name.lower() }}: {{ cookiecutter.module_name.capitalize() }}) -> {{ cookiecutter.module_name.capitalize() }}:
        await self.db_session.merge({{ cookiecutter.module_name.lower() }})
        await self.db_session.commit()
        return {{ cookiecutter.module_name.lower() }}

    async def get_by_id(self, {{ cookiecutter.module_name.lower() }}_id: int) -> {{ cookiecutter.module_name.capitalize() }} | None:
        statement = select({{ cookiecutter.module_name.capitalize() }}).filter_by(id={{ cookiecutter.module_name.lower() }}_id)
        return (await self.db_session.execute(statement)).scalar_one_or_none()

    async def delete(self, {{ cookiecutter.module_name.lower() }}_id: int) -> None:
        statement = select({{ cookiecutter.module_name.capitalize() }}).filter_by(id={{ cookiecutter.module_name.lower() }}_id)
        {{ cookiecutter.module_name.lower() }} = (
            await self.db_session.execute(statement)
        ).scalar_one_or_none()
        if {{ cookiecutter.module_name.lower() }}:
            await self.db_session.delete({{ cookiecutter.module_name.lower() }})
            await self.db_session.commit()
