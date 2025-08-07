import re

def validate_slug(slug: str) -> bool:
    """
    Validates if a string is a valid slug.
    Rules:
    - Must contain only lowercase letters, numbers, and hyphens
    - Cannot start or end with a hyphen
    - Cannot contain consecutive hyphens
    - Must be between 3 and 60 characters
    """
    if not slug or len(slug) < 3 or len(slug) > 60:
        return False
    
    # Remove consecutive hyphens and check if starts/ends with hyphen
    if '--' in slug or slug.startswith('-') or slug.endswith('-'):
        return False
    
    return re.match(r'^[a-z0-9-]+$', slug) is not None