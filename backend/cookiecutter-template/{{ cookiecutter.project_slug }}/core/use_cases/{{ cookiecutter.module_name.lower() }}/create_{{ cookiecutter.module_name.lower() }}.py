from splice.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository, {{ cookiecutter.module_name.capitalize() }}


class Create{{ cookiecutter.module_name.capitalize() }}:
    def __init__(self, {{ cookiecutter.module_name.lower() }}_repo: {{ cookiecutter.module_name.capitalize() }}Repository):
        self.{{ cookiecutter.module_name.lower() }}_repo = {{ cookiecutter.module_name.lower() }}_repo

    async def execute(self, **kwargs) -> {{ cookiecutter.module_name.capitalize() }}:
        new_{{ cookiecutter.module_name.lower() }} = {{ cookiecutter.module_name.capitalize() }}(**kwargs)
        return await self.{{ cookiecutter.module_name.lower() }}_repo.save(new_{{ cookiecutter.module_name.lower() }})
