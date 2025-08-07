from typing import Optional
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError

from schedly.infra.security.jwt_handler import decode_token

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        
        if not credentials:
            raise HTTPException(
                status_code=403, detail='Credenciais não fornecidas'
            )
            
        if not credentials.scheme == 'Bearer':
            raise HTTPException(
                status_code=403, detail='Esquema de autenticação inválido'
            )
            
        try:
            payload = decode_token(credentials.credentials)
            return payload['sub']
        except JWTError:
            raise HTTPException(
                status_code=403, detail='Token inválido ou expirado'
            )