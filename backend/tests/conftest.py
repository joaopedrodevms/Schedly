from contextlib import contextmanager
from datetime import datetime
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import scheduling
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app import app
from core.models.order import PaymentType
from infra.database.base import SQLModel
from infra.repositories.establishment_repository import (
    Establishment,
    EstablishmentRepository,
)
from infra.repositories.order_repository import (
    Order,
    OrderRepository,
)
from infra.repositories.user_repository import User, UserRepository


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
async def session():
    engine = create_async_engine('sqlite+aiosqlite:///:memory:')
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    # yield async_session
    async with async_session() as session:
        yield session
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
    await engine.dispose()


@pytest.fixture
async def user(session):
    return await UserRepository(session).save(
        User(
            first_name='paulo',
            last_name='visam',
            email='paulo@email.com',
            phone='5562123456789',
            username='paulovisam',
            password='password',
            photo='url_photo',
        )
    )


@pytest.fixture
async def establishment(session, user):
    return await EstablishmentRepository(session).save(
        Establishment(
            name='Restaurante do Zeca',
            description='Sabor e Tradição',
            photo='url_photo',
            user_id=user.id,
        )
    )


@pytest.fixture
async def order(session, user, establishment):
    return await OrderRepository(session).save(
        Order(
            value=100.0,
            payment_method=PaymentType.CASH,
            has_paid=True,
            user_id=user.id,
            establishment_id=establishment.id,
        )
    )


@pytest.fixture
def mock_db_time():
    return _mock_db_time


@contextmanager
def _mock_db_time(
    *,
    model,
    time=datetime(2024, 1, 1),
    uuid='188581a2-2903-49fb-87c3-a30a4598b760',
):
    def fake_time_hook(mapper, connection, target):
        if hasattr(target, 'created_at'):
            target.created_at = time
        if hasattr(target, 'id'):
            target.id = UUID(uuid)

    scheduling.listen(model, 'before_insert', fake_time_hook)

    yield time

    scheduling.remove(model, 'before_insert', fake_time_hook)
