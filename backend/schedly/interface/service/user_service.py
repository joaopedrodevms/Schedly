from typing import Any
from fastapi import Depends
from schedly.interface.schemas.User import UserPublicDto, UserUpdateRequestDto, UserValidateSlugResponseDto
from schedly.core.use_cases.user import (
    GetUser, UpdateUser, DeleteUser,
    UpdateAvatar, UpdateCover,
    RemoveAvatar, RemoveCover,
    ValidateSlug
)
from schedly.infra.repositories.user_repository import UserRepository
from schedly.infra.storage.storage_service import StorageService

class UserService:
    def __init__(
        self,
        user_repo: UserRepository = Depends(),
        storage_service: StorageService = Depends()
    ):
        self.user_repo = user_repo
        self.storage_service = storage_service

    async def get(self, user_id: str) -> UserPublicDto:
        use_case = GetUser(self.user_repo)
        return await use_case.execute(user_id)

    async def update(self, user_id: str, data: UserUpdateRequestDto) -> UserPublicDto:
        use_case = UpdateUser(self.user_repo)
        return await use_case.execute(user_id, data)

    async def delete(self, user_id: str) -> None:
        use_case = DeleteUser(self.user_repo)
        return await use_case.execute(user_id)

    async def update_avatar(self, user_id: str, file: Any) -> UserPublicDto:
        use_case = UpdateAvatar(self.user_repo, self.storage_service)
        return await use_case.execute(user_id, file)

    async def update_cover(self, user_id: str, file: Any) -> UserPublicDto:
        use_case = UpdateCover(self.user_repo, self.storage_service)
        return await use_case.execute(user_id, file)

    async def remove_avatar(self, user_id: str) -> UserPublicDto:
        use_case = RemoveAvatar(self.user_repo, self.storage_service)
        return await use_case.execute(user_id)

    async def remove_cover(self, user_id: str) -> UserPublicDto:
        use_case = RemoveCover(self.user_repo, self.storage_service)
        return await use_case.execute(user_id)
    
    async def validate_slug(self, slug: str) -> UserValidateSlugResponseDto:
        use_case = ValidateSlug(self.user_repo)
        return await use_case.execute(slug)