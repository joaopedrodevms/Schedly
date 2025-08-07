from minio import Minio
from schedly.settings import settings

minio_client = Minio(
    settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ACCESSKEY,
    secret_key=settings.MINIO_SECRETKEY,
    secure=settings.MINIO_SECURE  # Set to True in production with SSL
)

BUCKET_NAME = settings.MINIO_BUCKET_NAME

# Ensure bucket exists
def ensure_bucket():
    import json
    
    if not minio_client.bucket_exists(BUCKET_NAME):
        minio_client.make_bucket(BUCKET_NAME)
    
    # Set bucket policy to allow public read access
    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {"AWS": "*"},
                "Action": ["s3:GetObject"],
                "Resource": [f"arn:aws:s3:::{BUCKET_NAME}/*"]
            }
        ]
    }
    minio_client.set_bucket_policy(BUCKET_NAME, json.dumps(policy))