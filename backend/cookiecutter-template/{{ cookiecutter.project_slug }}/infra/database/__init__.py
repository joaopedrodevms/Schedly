# from async_generator import asynccontextmanager
import redis
from motor.motor_asyncio import AsyncIOMotorClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from settings import settings

# Redis
redis_session = redis.Redis(host='localhost', port=6379, db=0)

# MongoDB
__mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
mongo_session = __mongo_client.get_database(settings.MONGO_DB_NAME)


async def get_mongo_session():
    return mongo_session


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
