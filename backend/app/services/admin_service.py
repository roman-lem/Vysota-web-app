from app.models.user import User
from app.errors import UnauthorizedError, ForbiddenError


def getUsers(**kwargs):
    page = int(kwargs['page'])
    limit = int(kwargs['limit'])
    
    strictFilters = {}
    query = User.query.order_by(User.id)
    for key in strictFilters:
        if kwargs[key] is not None:
            query = query.filter(getattr(User, key) == kwargs[key])
            
    weakFilters = {"username"}
    for key in weakFilters:
        if kwargs.get(key) is not None:
            column = getattr(User, key)
            value = kwargs[key]
            query = query.filter(column.ilike(f"%{value}%"))
    
    total = query.count()
    query = query.offset((page - 1)*limit).limit(limit)
    
    
    result = [{
            'id': user.id,
            'username': user.username,
            'roles': [role.name for role in user.roles]
            } for user in query.all()]
    return {
        'message': 'Users got',
        'data': result,
        'meta': {
            'page': page,
            'limit': limit,
            'total': total
        }
    }, 200

def getUser(ident):
    user = User.query.get_or_404(ident)
    roles = [role.name for role in user.roles]
    return {
        'message': 'Student got',
        'data': {
            "id": user.id,
            "username": user.username,
            "roles": roles
        },
        'meta': {}}, 200