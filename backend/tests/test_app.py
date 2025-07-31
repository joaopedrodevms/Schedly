from fastapi import status
from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


async def test_read_main():
    response = client.get('/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {'message': 'Olá Mundo!'}
