from splice.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository, {{ cookiecutter.module_name.capitalize() }}


class Get{{ cookiecutter.module_name.capitalize() }}:
    def __init__(self, {{ cookiecutter.module_name.lower() }}_repo: {{ cookiecutter.module_name.capitalize() }}Repository):
        self.{{ cookiecutter.module_name.lower() }}_repo = {{ cookiecutter.module_name.lower() }}_repo

    async def get_by_id(self, {{ cookiecutter.module_name.lower() }}_id: int) -> {{ cookiecutter.module_name.capitalize() }} | None:
        return await self.{{ cookiecutter.module_name.lower() }}_repo.get_by_id({{ cookiecutter.module_name.lower() }}_id)
