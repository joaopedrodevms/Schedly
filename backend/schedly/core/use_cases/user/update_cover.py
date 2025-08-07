from typing import Any
from infra.storage.storage_service import StorageService, ProfilePhotoType
from interface.schemas.User import UserPublicDto
from infra.repositories.user_repository import UserRepository
from interface.exceptions.photo_exceptions import UserNotFoundException
from core.models.photo import PhotoValidator

class UpdateCover:
    def __init__(self, user_repo: UserRepository, storage_service: StorageService):
        self.user_repo = user_repo
        self.storage_service = storage_service

    async def execute(self, user_id: str, file: Any) -> UserPublicDto:
        """
        Updates user's cover photo
        
        Args:
            user_id: ID of the user
            file: Photo file to upload
            
        Returns:
            UserPublicDto: Updated user data
            
        Raises:
            UserNotFoundException: If user is not found
            InvalidPhotoFormatException: If photo format is invalid
            PhotoTooLargeException: If photo size exceeds limit
        """
        # Validate photo
        await PhotoValidator.validate(file)
        
        # Get user
        user = await self._get_user(user_id)
        
        # Delete old cover if exists
        if user.cover_url:
            try:
                await self.storage_service.delete_profile_photo(user_id, ProfilePhotoType.COVER)
            except Exception:
                # Log error but continue with upload
                pass
            
        # Upload new cover
        file_content = await file.read()
        await file.seek(0)  # Reset file pointer for storage service
        url = await self.storage_service.upload_profile_photo(file, user_id, ProfilePhotoType.COVER)
        user.cover_url = url
        
        # Update user
        updated_user = await self.user_repo.update(user)
        return UserPublicDto(**updated_user.model_dump())

    async def _get_user(self, user_id: str):
        """Gets user by ID or raises exception if not found"""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundException(user_id)
        return user