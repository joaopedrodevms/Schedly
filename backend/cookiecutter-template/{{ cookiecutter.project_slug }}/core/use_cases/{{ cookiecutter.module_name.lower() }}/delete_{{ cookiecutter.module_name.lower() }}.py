from schedly.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository


class Delete{{ cookiecutter.module_name.capitalize() }}:
    def __init__(self, {{ cookiecutter.module_name.lower() }}_repo: {{ cookiecutter.module_name.capitalize() }}Repository):
        self.{{ cookiecutter.module_name.lower() }}_repo = {{ cookiecutter.module_name.lower() }}_repo

    async def execute(self, {{ cookiecutter.module_name.lower() }}_id: int) -> None:
        await self.{{ cookiecutter.module_name.lower() }}_repo.delete({{ cookiecutter.module_name.lower() }}_id)
