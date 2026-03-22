from app.models.user import User
from flask import request, g
from app.errors import UnauthorizedError, ForbiddenError


def getUsers():
    page = 1,
    limit = 20
    users = User.query.all()
    total = len(users)
    result = [{
            'id': user.id,
            'username': user.username,
            'roles': [role.name for role in user.roles]
            } for user in users]
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