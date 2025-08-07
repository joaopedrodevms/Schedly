from schedly.interface.schemas.User import UserPublicDto, UserUpdateRequestDto
from schedly.infra.repositories.user_repository import UserRepository
from schedly.utils.validate_slug import validate_slug

class UpdateUser:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, token_user_id: str, data: UserUpdateRequestDto) -> UserPublicDto:
        # Obtém  pelo ID
        user = await self.user_repo.get_by_id(token_user_id)

        if not user:
            raise ValueError('User não encontrado')

        if data.slug:
            user_by_slug = await self.user_repo.get_by_slug(data.slug)
            if user_by_slug:
                raise ValueError('Slug já existe')
            
            if not validate_slug(data.slug):
                raise ValueError('Slug inválido')
        
        # Atualiza somente os atributos fornecidos
        for key, value in data.model_dump(exclude_unset=True).items():
            if value is not None and hasattr(user, key):
                setattr(user, key, value)

        updated_user = await self.user_repo.update(user)
        return UserPublicDto(**updated_user.model_dump())
