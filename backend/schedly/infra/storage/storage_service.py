from io import BytesIO
from typing import BinaryIO
from enum import Enum
from urllib.parse import urljoin

from fastapi import UploadFile
from minio.error import S3Error
from schedly.settings import settings

from .minio_config import minio_client, BUCKET_NAME, ensure_bucket

class ProfilePhotoType(Enum):
    AVATAR = "avatar"
    COVER = "cover"

class StorageService:
    @staticmethod
    def _get_profile_photo_path(user_id: str, photo_type: ProfilePhotoType, file_extension: str) -> str:
        """
        Generate a consistent path for profile photos
        
        Args:
            user_id (str): The ID of the user
            photo_type (ProfilePhotoType): Type of photo (avatar/cover)
            file_extension (str): File extension (e.g., jpg, png)
            
        Returns:
            str: The object path in storage
        """
        return f"profile-photos/{user_id}/{photo_type.value}.{file_extension}"
        
    @staticmethod
    def _get_public_url(object_name: str) -> str:
        """
        Generate a public URL for an object
        
        Args:
            object_name (str): The object path in storage
            
        Returns:
            str: The public URL for the object
        """
        # Use the public URL from settings for external access
        return urljoin(f"{settings.MINIO_PUBLIC_URL}/{BUCKET_NAME}/", object_name)

    @staticmethod
    async def upload_profile_photo(file: UploadFile, user_id: str, photo_type: ProfilePhotoType) -> str:
        """
        Upload a profile photo to MinIO storage
        
        Args:
            file (UploadFile): The file to upload
            user_id (str): The ID of the user
            photo_type (ProfilePhotoType): Type of photo (avatar/cover)
            
        Returns:
            str: The URL of the uploaded file
        """
        try:
            ensure_bucket()
            
            # Generate consistent filename
            file_extension = file.filename.split('.')[-1].lower()
            object_name = StorageService._get_profile_photo_path(user_id, photo_type, file_extension)
            
            # Get file size and data
            file_data = await file.read()
            file_size = len(file_data)
            
            # Create BytesIO object from file data
            file_stream = BytesIO(file_data)
            
            # Upload the file (will overwrite if exists)
            minio_client.put_object(
                bucket_name=BUCKET_NAME,
                object_name=object_name,
                data=file_stream,
                length=file_size,
                content_type=file.content_type
            )
            
            # Generate a public URL for the uploaded object
            return StorageService._get_public_url(object_name)
            
        except S3Error as e:
            raise Exception(f"Error uploading file to storage: {str(e)}")
        finally:
            await file.close()
    
    @staticmethod
    async def delete_profile_photo(user_id: str, photo_type: ProfilePhotoType) -> None:
        """
        Delete a profile photo from MinIO storage
        
        Args:
            user_id (str): The ID of the user
            photo_type (ProfilePhotoType): Type of photo to delete
        """
        try:
            # List all objects with the prefix to find the file (to get the extension)
            prefix = f"profile-photos/{user_id}/{photo_type.value}"
            objects = minio_client.list_objects(BUCKET_NAME, prefix=prefix)
            
            # Delete each matching object (should be only one)
            for obj in objects:
                minio_client.remove_object(BUCKET_NAME, obj.object_name)
                
        except S3Error as e:
            raise Exception(f"Error deleting file from storage: {str(e)}")
            
    @staticmethod
    def get_profile_photo_url(user_id: str, photo_type: ProfilePhotoType, file_extension: str) -> str:
        """
        Get a public URL for a profile photo
        
        Args:
            user_id (str): The ID of the user
            photo_type (ProfilePhotoType): Type of photo
            file_extension (str): File extension of the photo
            
        Returns:
            str: The public URL for the object
        """
        try:
            object_name = StorageService._get_profile_photo_path(user_id, photo_type, file_extension)
            return StorageService._get_public_url(object_name)
        except Exception as e:
            raise Exception(f"Error generating public URL: {str(e)}")