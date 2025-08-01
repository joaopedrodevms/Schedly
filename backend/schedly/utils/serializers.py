def serialize_model(model):
    """Serializa um modelo SQLModel e seus relacionamentos."""
    if model is None:
        return None

    if isinstance(model, list):
        return [serialize_model(item) for item in model]

    # Converter o modelo para dicionário
    data = model.model_dump()

    # Processar relacionamentos
    for key, value in data.items():
        if hasattr(model, key) and getattr(model, key) is not None:
            attr = getattr(model, key)
            if hasattr(attr, 'model_dump'):
                data[key] = serialize_model(attr)
            elif isinstance(attr, list):
                data[key] = [serialize_model(item) for item in attr]

    return data
