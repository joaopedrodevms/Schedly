import os
from uuid import UUID

from core.use_cases.user import CreateUser
from infra.database import mongo_session, pg_session
from infra.repositories.user_repository import User, UserRepository
from utils.password import hash_password


async def seed():
    # Drop tables
    os.system('task alembic_down_up')
    mongo_session.drop_collection('messages')
    async with pg_session() as session:

        # Prepare data
        paulo = User(
            id=UUID('9301da1f-8e69-4312-91dc-ba54b5f47174'),
            first_name='Paulo',
            last_name='Mendonca',
            phone='010101',
            email='paulo@email.com',
            username='paulo',
            password='secret',
            photo='my_photo',
        )
        alice = User(
            id=UUID('2aeefff0-3ac2-4213-9e06-1cba6e4e226f'),
            first_name='Alice',
            last_name='Silva',
            phone='020202',
            email='alice@email.com',
            username='alice',
            password='secret',
            photo='my_photo',
        )

        # Postgres
        user_repo = UserRepository(session)
        use_case = CreateUser(user_repo=user_repo)
        await use_case.execute(**alice.model_dump())
        await use_case.execute(**paulo.model_dump())


if __name__ == '__main__':
    import asyncio

    asyncio.run(seed())
