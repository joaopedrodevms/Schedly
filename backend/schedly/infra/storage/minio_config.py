from minio import Minio
from settings import settings

minio_client = Minio(
    "localhost:9000",
    access_key="admin",
    secret_key="admin1234",
    secure=False  # Set to True in production with SSL
)

BUCKET_NAME = "schedly-profiles"

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