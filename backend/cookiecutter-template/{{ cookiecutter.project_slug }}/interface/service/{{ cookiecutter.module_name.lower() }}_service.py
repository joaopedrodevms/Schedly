# app/api/services/{{ cookiecutter.module_name.lower() }}_service.py
from schedly.core.use_cases.{{ cookiecutter.module_name.lower() }} import (
    Create{{ cookiecutter.module_name.capitalize() }},
    Delete{{ cookiecutter.module_name.capitalize() }},
    Get{{ cookiecutter.module_name.capitalize() }},
    Update{{ cookiecutter.module_name.capitalize() }}
)
from schedly.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository, {{ cookiecutter.module_name.capitalize() }}


class {{ cookiecutter.module_name.capitalize() }}Service:
    def __init__(self, repo: {{ cookiecutter.module_name.capitalize() }}Repository):
        self.repo = repo

    async def create(self, **kwargs) -> {{ cookiecutter.module_name.capitalize() }}:
        use_case = Create{{ cookiecutter.module_name.capitalize() }}(self.repo)
        return await use_case.execute(**kwargs)

    async def get_by_id(self, {{ cookiecutter.module_name.lower() }}_id: int) -> {{ cookiecutter.module_name.capitalize() }} | None:
        use_case = Get{{ cookiecutter.module_name.capitalize() }}(self.repo)
        return await use_case.get_by_id({{ cookiecutter.module_name.lower() }}_id)

    async def update(self, {{ cookiecutter.module_name.lower() }}_id: int, **kwargs) -> {{ cookiecutter.module_name.capitalize() }}:
        use_case = Update{{ cookiecutter.module_name.capitalize() }}(self.repo)
        return await use_case.execute({{ cookiecutter.module_name.lower() }}_id={{ cookiecutter.module_name.lower() }}_id, **kwargs)

    async def delete(self, {{ cookiecutter.module_name.lower() }}_id: int) -> None:
        use_case = Delete{{ cookiecutter.module_name.capitalize() }}(self.repo)
        return await use_case.execute({{ cookiecutter.module_name.lower() }}_id)
