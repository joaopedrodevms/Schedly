class NotFoundException(Exception):
    def __init__(self, detail: str = 'Resource not found'):
        self.detail = detail
        self.status_code = 404


class BusinessException(Exception):
    def __init__(self, detail: str):
        self.detail = detail
        self.status_code = 400


class ValidationException(Exception):
    def __init__(self, detail: str):
        self.detail = detail
        self.status_code = 422


class AuthenticationException(Exception):
    def __init__(self, detail: str):
        self.detail = detail
        self.status_code = 401
