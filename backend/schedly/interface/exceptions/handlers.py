from fastapi import Request
from fastapi.responses import JSONResponse

from interface.exceptions.custom_exceptions import (
    AuthenticationException,
    BusinessException,
    NotFoundException,
    ValidationException,
)


async def invalid_value(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=500,
        content={'error': 'Invalid Value', 'detail': str(exc)},
    )


async def invalid_type(request: Request, exc: TypeError):
    return JSONResponse(
        status_code=500,
        content={'error': 'Invalid Value', 'detail': str(exc)},
    )


async def not_found_exception_handler(
    request: Request, exc: NotFoundException
):
    return JSONResponse(
        status_code=404,
        content={'error': 'Not Found', 'detail': exc.detail},
    )


async def business_exception_handler(request: Request, exc: BusinessException):
    return JSONResponse(
        status_code=400,
        content={'error': 'Business Error', 'detail': exc.detail},
    )


async def validation_exception_handler(
    request: Request, exc: ValidationException
):
    return JSONResponse(
        status_code=422,
        content={'error': 'Validation Error', 'detail': exc.detail},
    )


async def authentication_exception_handler(
    request: Request, exc: AuthenticationException
):
    return JSONResponse(
        status_code=401,
        content={'error': 'Authentication Error', 'detail': exc.detail},
    )


async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={'error': 'Internal Server Error', 'detail': str(exc)},
    )
