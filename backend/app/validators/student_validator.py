from app.errors import ValidationError
import datetime


def studentGetValidator(**kwargs):
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
    
    if "name" in kwargs:
        name = kwargs["name"]
    else:
        name = None
        
    if "level" in kwargs:
        level = kwargs["level"]
        if level.upper() not in ["НАЧИНАЮЩИЙ", "ПРОДОЛЖАЮЩИЙ", "КМС", "МС", ""]:
            raise ValidationError("level", kwargs["level"], "in list")
        if level == "":
            level =None
    else:
        level = None
    
    
    if "status" in kwargs:
        if kwargs["status"].upper() not in ["ЗАНИМАЕТСЯ", "НЕ ЗАНИМАЕТСЯ"]:
            raise ValidationError("status", kwargs["status"], "in list")
    else:
        status = None
    
    return {"name": name,
            "page": page, 
            "limit": limit, 
            "level": level, 
            "status": status}
    
def studentSetValidator(**kwargs):
    
    if "name" not in kwargs:
        raise ValidationError("name", "", "")
    name = kwargs['name']
    if "level" not in kwargs:
        raise ValidationError("level", "", "")
    level = kwargs['level']
    if "parent_name" not in kwargs:
        raise ValidationError("parent_name", "", "")
    parent_name = kwargs['parent_name']
    if "parent_phone" not in kwargs:
        raise ValidationError("parent_phone", "", "")
    parent_phone = kwargs['parent_phone']
    if "birth_date" not in kwargs:
        raise ValidationError("birth_date", "", "")
    birth_date = datetime.datetime.strptime(kwargs['birth_date'], '%Y-%m-%d').date()
        
    if not name:
        raise ValidationError("name", name, "")
        
    if len(name) > 100:
        raise ValidationError("name", name, "< 100 symbols")
    
    if not parent_name:
        raise ValidationError("parent_name", parent_name, "")
        
    if len(parent_name) > 100:
        raise ValidationError("parent_name", parent_name, "< 100 symbols")
        
    if  level.upper() not in ["НАЧИНАЮЩИЙ", "ПРОДОЛЖАЮЩИЙ", "КМС", "МС"]:
        raise ValidationError("level", level, "in list")
        
    if not parent_phone:
        raise ValidationError("parent_phone", parent_phone, "")
        
    def isInt(x):
        try:
            int(x)
            return True
        except ValueError:
            return False
        
    
    return {"name": kwargs["name"],
            "level": kwargs["level"],
            "parent_name": kwargs["parent_name"],
            "parent_phone": kwargs["parent_phone"],
            "birth_date": birth_date}