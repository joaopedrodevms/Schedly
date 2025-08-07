from schedly.infra.repositories.user_repository import UserRepository
from schedly.interface.schemas.User import UserValidateSlugResponseDto
from schedly.utils.validate_slug import validate_slug

class ValidateSlug:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, slug: str) -> UserValidateSlugResponseDto:
        if not slug:
            return UserValidateSlugResponseDto(is_valid=False, message="Slug não pode ser vazio")
        
        user = await self.user_repo.get_by_slug(slug)
        if user:
            return UserValidateSlugResponseDto(is_valid=False, message="Slug já existe")
        
        if not validate_slug(slug):
            return UserValidateSlugResponseDto(is_valid=False, message="Slug inválido")

        return UserValidateSlugResponseDto(is_valid=True, message="Slug válido")