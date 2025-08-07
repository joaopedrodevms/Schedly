class PhotoUpdateException(Exception):
    """Base exception for photo update operations"""
    pass

class InvalidPhotoFormatException(PhotoUpdateException):
    """Raised when photo format is not supported"""
    def __init__(self, message="Formato de arquivo não suportado. Use apenas .jpg, .jpeg ou .png"):
        self.message = message
        super().__init__(self.message)

class PhotoTooLargeException(PhotoUpdateException):
    """Raised when photo size exceeds maximum allowed"""
    def __init__(self, message="Arquivo muito grande. Tamanho máximo permitido: 5MB"):
        self.message = message
        super().__init__(self.message)

class UserNotFoundException(PhotoUpdateException):
    """Raised when user is not found"""
    def __init__(self, user_id: str):
        self.message = f"Usuário {user_id} não encontrado"
        super().__init__(self.message)