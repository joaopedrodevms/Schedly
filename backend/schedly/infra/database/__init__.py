# from async_generator import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from schedly.settings import settings


# Sync
# engine = create_engine(settings.DATABASE_URL)
# def get_pg_session():
#     with Session(engine) as session:
#         yield session

# Async
engine = create_async_engine(settings.DATABASE_URL)
pg_session = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


async def get_pg_session():
    # return pg_session
    async with pg_session() as session:
        yield session
