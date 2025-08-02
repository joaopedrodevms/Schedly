from contextlib import asynccontextmanager

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from interface.exceptions.custom_exceptions import (
    BusinessException,
    NotFoundException,
    ValidationException,
)
from interface.exceptions.handlers import (
    business_exception_handler,
    invalid_type,
    invalid_value,
    not_found_exception_handler,
    validation_exception_handler,
)
from settings import settings
from interface.routers.scheduling_router import router as scheduling_router
from interface.routers.user_router import router as user_router
from interface.routers.event_router import router as event_router
from interface.routers.avails_router import router as avails_router
from interface.routers.auth_router import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Para fazer antes de iniciar
    yield
    # Desfazer


app = FastAPI(
    title=f'{settings.PROJECT_NAME} API',
    version='0.1.0',
    description='',
    license_info={
        'name': 'Nginx',
        'url': 'http://nginx.org/LICENSE',
    },
    openapi_url=settings.OPENAPI_URL,
    openapi_tags=[],
    lifespan=lifespan,
)

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# * Adicione routes aqui
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(scheduling_router)
app.include_router(event_router)
app.include_router(avails_router)
app.add_exception_handler(ValueError, invalid_value)
app.add_exception_handler(NotFoundException, not_found_exception_handler)
app.add_exception_handler(BusinessException, business_exception_handler)
app.add_exception_handler(ValidationException, validation_exception_handler)
app.add_exception_handler(TypeError, invalid_type)


@app.get('/')
async def read_root():
    return {'message': 'Olá Mundo!'}


def run_migrations():
    return
    alembic_cfg = Config(f'schedly/alembic.ini')
    command.upgrade(alembic_cfg, 'head')


if __name__ == '__main__':
    # Rodar as migrações antes de iniciar a aplicação
    run_migrations()

    import uvicorn

    uvicorn.run(
        'app:app',
        port=8000,
        host='0.0.0.0',
        reload=True,
        proxy_headers=True,
        forwarded_allow_ips='*',
        # log_config='log/log_config_time.ini',
    )
