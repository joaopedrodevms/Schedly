from enum import Enum
from typing import Any
from interface.exceptions.photo_exceptions import InvalidPhotoFormatException, PhotoTooLargeException

class PhotoType(Enum):
    AVATAR = "avatar"
    COVER = "cover"

class PhotoValidator:
    ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png'}
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

    @staticmethod
    async def validate(file: Any) -> None:
        """
        Validates photo file format and size
        
        Args:
            file: The file to validate
            
        Raises:
            InvalidPhotoFormatException: If file format is not supported
            PhotoTooLargeException: If file size exceeds maximum allowed
        """
        if not PhotoValidator._is_valid_extension(file.filename):
            raise InvalidPhotoFormatException()
        
        if not await PhotoValidator._is_valid_size(file):
            raise PhotoTooLargeException()

    @staticmethod
    def _is_valid_extension(filename: str) -> bool:
        """Checks if file extension is supported"""
        return any(filename.lower().endswith(ext) for ext in PhotoValidator.ALLOWED_EXTENSIONS)

    @staticmethod
    async def _is_valid_size(file: Any) -> bool:
        """Checks if file size is within limits"""
        file_content = await file.read()
        await file.seek(0)  # Reset file pointer
        return len(file_content) <= PhotoValidator.MAX_FILE_SIZE