from sqlalchemy import select

from infra.repositories.user_repository import User, UserRepository


async def test_create_user(session):
    repo = UserRepository(db_session=session)
    user = User(
        first_name='Alice',
        last_name='Silva',
        phone='00000000000',
        email='teste@test',
        username='alice',
        password='secret',
        photo='url_photo',
    )
    await repo.save(user)
    res = await session.scalar(select(User).where(User.username == 'alice'))
    assert res
    assert res.username == user.username


async def test_get_user_by_email(session):
    repo = UserRepository(db_session=session)
    user = User(
        first_name='Alice',
        last_name='Silva',
        phone='00000000000',
        email='teste@test',
        username='alice',
        password='secret',
        photo='url_photo',
    )
    await repo.save(user)
    result = await repo.get_by_email(user.email)

    assert result
    assert result.id == user.id


async def test_get_user_by_id(session):
    repo = UserRepository(db_session=session)
    user = User(
        first_name='Alice',
        last_name='Silva',
        phone='00000000000',
        email='teste@test',
        username='alice',
        password='secret',
        photo='url_photo',
    )
    await repo.save(user)
    result = await repo.get_by_id(user.id)

    assert result
    assert result.email == user.email


async def test_get_user_by_phone(session):
    repo = UserRepository(db_session=session)
    user = User(
        first_name='Alice',
        last_name='Silva',
        phone='00000000000',
        email='teste@test',
        username='alice',
        password='secret',
        photo='url_photo',
    )
    await repo.save(user)
    result = await repo.get_by_phone(user.phone)

    assert result
    assert result.id == user.id


async def test_get_user_by_username(session):
    repo = UserRepository(db_session=session)
    user = User(
        first_name='Alice',
        last_name='Silva',
        phone='00000000000',
        email='teste@test',
        username='alice',
        password='secret',
        photo='url_photo',
    )
    await repo.save(user)
    result = await repo.get_by_username(user.username)

    assert result
    assert result.id == user.id
