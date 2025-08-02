from schedly.infra.repositories.{{ cookiecutter.module_name.lower() }}_repository import {{ cookiecutter.module_name.capitalize() }}Repository, {{ cookiecutter.module_name.capitalize() }}


class Update{{ cookiecutter.module_name.capitalize() }}:
    def __init__(self, {{ cookiecutter.module_name.lower() }}_repo: {{ cookiecutter.module_name.capitalize() }}Repository):
        self.{{ cookiecutter.module_name.lower() }}_repo = {{ cookiecutter.module_name.lower() }}_repo

    async def execute(self, {{ cookiecutter.module_name.lower() }}_id: str, **kwargs) -> {{ cookiecutter.module_name.capitalize() }}:
        # Obtém  pelo ID
        {{ cookiecutter.module_name.lower() }} = await self.{{ cookiecutter.module_name.lower() }}_repo.get_by_id({{ cookiecutter.module_name.lower() }}_id)

        if not {{ cookiecutter.module_name.lower() }}:
            raise ValueError('{{ cookiecutter.module_name.capitalize() }} não encontrado')

        # Atualiza somente os atributos fornecidos
        for key, value in kwargs.items():
            if value is not None and hasattr({{ cookiecutter.module_name.lower() }}, key):
                setattr({{ cookiecutter.module_name.lower() }}, key, value)

        return await self.{{ cookiecutter.module_name.lower() }}_repo.save({{ cookiecutter.module_name.lower() }})
