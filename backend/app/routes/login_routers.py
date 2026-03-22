from flask import Blueprint, request, g
from app.services.login_service import refreshToken, registerUser, loginUser
from app.errors import UnauthorizedError

loginBP = Blueprint('login', __name__)

@loginBP.route('/auth', methods = ["POST"])
def login():
    print(loginUser(request.json))
    return loginUser(request.json)

@loginBP.route('/register', methods = ["POST"])
def register():
    return registerUser(request.json)

@loginBP.route('/access', methods = ["GET"])
def access():
    if g.user:
        return {
            'message': 'Access granted',
            'data': { 'id': g.user.id, 'roles': [role.name for role in g.user.roles]},
            'meta': {}
        }, 200
    else: 
        raise UnauthorizedError("User was not found")
    
@loginBP.route('/refresh', methods = ["GET"])
def refresh():
    return refreshToken(request.headers.get('Authorization'))