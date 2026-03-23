from app.errors import ValidationError
import datetime


def userGetValidator(**kwargs):
    if "page" not in kwargs:
        page = 1
    else:
        page = kwargs['page']
    try:
        page = int(page)
    except ValueError:
        raise ValidationError("page", page, "int")
    
    
    if "limit" not in kwargs:
        limit = 20
    else:    
        limit = kwargs['limit']
    try:
        limit = int(limit)
    except ValueError:
        raise ValidationError("limit", limit, "int")
        
    if page < 1:
        raise ValidationError("page", page, ">=1")
    
    if limit < 1 or limit > 100:
        raise ValidationError("limit", limit, "0 < limit <= 100")
        
    for key in kwargs:
        if kwargs[key] is None:
            raise ValidationError(f"kwargs[{key}]", kwargs[key], "non nullable")
    
    if "name" in kwargs and kwargs["name"] != "":
        name = kwargs["name"]
    else:
        name = None
    
    roles = []
    if "roles" in kwargs:
        if kwargs["roles"] in ["owner", "admin", "trainer"]:
            roles = kwargs["roles"]
    
    return {"username": name,
            "page": page, 
            "limit": limit,
            "roles": roles}
