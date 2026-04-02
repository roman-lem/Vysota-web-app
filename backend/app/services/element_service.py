from app.models.element import Element
from app.errors import UnauthorizedError, ForbiddenError


def fetchElements(user, **kwargs):
    page = int(kwargs['page'])
    limit = int(kwargs['limit'])
    code = kwargs["code"]
    
    user_elements = user.elements
    if not user.hasRole('owner', 'admin'):
        user_elements = user.elements

    common_elements = Element.query.filter(Element.is_custom == False)

    weakFilters = {"code"}
    for key in weakFilters:
        if kwargs.get(key) is not None:
            column = getattr(Element, key)
            value = kwargs[key]
            common_elements = common_elements.filter(column.ilike(f"%{value}%"))

    elements = user_elements.union_all(common_elements)
    
    total = elements.count()
    elements = elements.offset((page - 1)*limit).limit(limit)
    
    
    result = [{
            'id': element.id,
            'type': element.type,
            'sportsmen_number': element.sportsmen_number,
            'equipment': element.equipment,
            'score': element.score,
            'code': element.code,
            'description': element.description,
            'image': element.image
            } for element in elements.all()]
    return {
        'message': 'Elements got',
        'data': result,
        'meta': {
            'page': page,
            'limit': limit,
            'total': total
        }
    }, 200