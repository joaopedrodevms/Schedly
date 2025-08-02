
from schedly.infra.database.base import BaseTable, Field
from schedly.utils.generate_schemas import generate_schema


class {{ cookiecutter.module_name.capitalize() }}(BaseTable, table=True):
    __tablename__ = '{{ cookiecutter.module_name.lower() }}s'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no models.py
    # cd schedly
    # alembic revision --autogenerate -m "create_table_{{ cookiecutter.module_name.lower() }}"
    # alembic upgrade head

{{ cookiecutter.module_name.capitalize() }}CreateSchema = generate_schema({{ cookiecutter.module_name.capitalize() }})
{{ cookiecutter.module_name.capitalize() }}UpdateSchema = generate_schema({{ cookiecutter.module_name.capitalize() }}, optional=True)

