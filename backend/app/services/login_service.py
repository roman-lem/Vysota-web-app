import os

from app.models.user import User
from app.extensions import db
import argon2
from argon2 import PasswordHasher
import jwt
import datetime
from datetime import timedelta, timezone
from app.models.user_role import UserRole
from app.models.role import Role
from flask import g, request
from app.errors import UnauthorizedError, ValidationError, NotFoundError

ph = PasswordHasher()
jwt_secret = os.getenv('SECRET_KEY')


def authRequired():
    if request.method == 'OPTIONS':
        return None
    token = request.headers.get('Authorization')
    if not token:
        g.user = None
        return None
    try:
        if type(token) == bytes:
            token = token.decode('utf-8')
        if token.startswith('Bearer '):
            token = token[7:]
        decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = decoded['user_id']
        user = User.query.get(user_id)
        if not user:
            g.user = None
            raise ValidationError('User', "none", "")
        g.user = user
    except jwt.ExpiredSignatureError:
        g.user = None
        raise UnauthorizedError("Token expired")
    except jwt.InvalidTokenError:
        g.user = None
    return None



def registerUser(data):
    user = User(
        username = data['username'],
        password = ph.hash(data['password']),
    )
    existing_user = User.query.filter_by(username=data['username']).first()

    if existing_user:
        raise ValidationError('username', 'repeated', 'unique')
    default_role = Role.query.filter_by(name = "trainer").first()
    db.session.add(user)
    db.session.flush()
    user_role = UserRole(
        user_id = user.id,
        role_id = default_role.id
    )
    db.session.add(user_role)
    db.session.commit()
    return {'message': 'User registered',
                'data': {},
                'meta': {}}, 200

def loginUser(data):
    user = User.query.filter_by(username=data["username"]).first()
    try:
        if user and ph.verify(user.password, data['password']):
            accessToken = jwt.encode({'user_id': user.id, "exp": int((datetime.datetime.now(timezone.utc) + timedelta(hours=1)).timestamp())}, jwt_secret, algorithm='HS256')
            refreshToken = jwt.encode({'user_id': user.id, "exp": int((datetime.datetime.now(timezone.utc) + timedelta(days=7)).timestamp())}, jwt_secret, algorithm='HS256')
            return {'message': 'success', 
                    'data': {
                        'access_token': accessToken, 
                        'refresh_token': refreshToken
                        },
                    'meta': {}}, 200
        else:
            raise UnauthorizedError('Такого пользователя не существует')
    except argon2.exceptions.VerifyMismatchError:
        raise UnauthorizedError("Неверный пароль")
    

def refreshToken(token):
    try:
        if type(token) == bytes:
            token = token.decode('utf-8')
        if token.startswith('Bearer '):
            token = token[7:]
        decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = decoded['user_id']
        user = User.query.get(user_id)
        if not user:
            raise NotFoundError("User")
        accessToken = jwt.encode({'user_id': user.id, "exp": int((datetime.datetime.now(timezone.utc) + timedelta(hours=1)).timestamp())}, jwt_secret, algorithm='HS256')
        return {'message': 'Access granted', 
                'data': {
                    'access_token': accessToken
                    },
                'meta': {}}, 200
    except jwt.ExpiredSignatureError:
        raise UnauthorizedError("Token expired")
    except jwt.InvalidTokenError:
        raise UnauthorizedError("Invalid token")