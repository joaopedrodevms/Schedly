
from splice.infra.database.base import BaseTable
from splice.utils.generate_schemas import generate_schema


class {{ cookiecutter.module_name.capitalize() }}(BaseTable, table=True):
    __tablename__ = '{{ cookiecutter.module_name.lower() }}s'
    # TODO - preencher os dados
    # Executar
    # importar o modelo no models.py
    # cd splice
    # alembic revision --autogenerate -m "create_table{{ cookiecutter.module_name.lower() }}"

{{ cookiecutter.module_name.capitalize() }}CreateSchema = generate_schema({{ cookiecutter.module_name.capitalize() }})
{{ cookiecutter.module_name.capitalize() }}UpdateSchema = generate_schema({{ cookiecutter.module_name.capitalize() }}, optional=True)

