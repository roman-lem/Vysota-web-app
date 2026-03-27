from app.models.element import Element
from app.errors import UnauthorizedError, ForbiddenError


def fetchElements(user, **kwargs):
    page = int(kwargs['page'])
    limit = int(kwargs['limit'])
    
    user_elements = Element.query.order_by(Element.id)
    if not user.hasRole('owner', 'admin'):
        user_elements = user.elements

    common_elements = Element.query.filter(is_custom == False)

    elements = user_elements.union(common_elements)
    
    total = elements.count()
    elements = elements.offset((page - 1)*limit).limit(limit)
    
    
    result = [{
            'id': element.id,
            'type': element.type,
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