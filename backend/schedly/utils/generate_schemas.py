from typing import Optional, Type

from pydantic import BaseModel, create_model
from sqlmodel import SQLModel


def generate_schema(
    model: Type[SQLModel],
    *,
    exclude: set[str] = {'id', 'created_at', 'updated_at'},
    optional: bool = False,
) -> Type[BaseModel]:
    """
    Gera dinamicamente um schema Pydantic a partir de um modelo SQLModel.

    :param model: classe base (ex: User)
    :param exclude: conjunto de campos a serem excluídos (ex: {"id"}
        para criação)
    :param optional: se True, torna os campos (exceto os excluídos ou id)
        opcionais (para update)
    :return: classe BaseModel gerada dinamicamente
    """
    annotations = {}
    for field_name, model_field in model.model_fields.items():
        if optional and field_name == 'id':
            pass
        elif exclude and field_name in exclude:
            continue
        # Obtemos o tipo correto do campo
        field_type = model_field.annotation
        # Se for update (partial) e o campo não for 'id', torna-o opcional
        if optional and field_name != 'id':
            annotations[field_name] = (Optional[field_type], None)
        else:
            annotations[field_name] = (field_type, ...)
    schema_name = f"{model.__name__}{'Update' if optional else 'Create'}Schema"
    return create_model(schema_name, **annotations)
