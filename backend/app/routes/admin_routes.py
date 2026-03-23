from flask import Blueprint, request, g
from app.services.student_service import getStudent, getStudents
from app.services.admin_service import getUsers, getUser
from app.validators.student_validator import studentGetValidator
from app.validators.users_validator import userGetValidator
from functools import wraps
from app.errors import ForbiddenError, NotFoundError

adminBP = Blueprint('admin', __name__)


def rolesRequired(*roles):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if g.user == None:
                raise NotFoundError("User")
            elif not g.user.hasRole(*roles):
                raise ForbiddenError()
            else:
                return f(*args, **kwargs)
        return wrapper
    return decorator

    
@adminBP.route('/admin', methods = ["POST", "GET"])
@rolesRequired('admin', 'owner')
def greeting():
    return {"message": "Access granted",
            'data': {},
            'meta': {}}, 200

@adminBP.route('/admin/students', methods = ["GET"])
@rolesRequired('admin', 'owner')
def getMyStudents():
    validated = studentGetValidator(**request.args)
    return getStudents(g.user, **validated)

@adminBP.route('/admin/students/<id>', methods = ["GET"])
@rolesRequired('admin', 'owner')
def selectStudent(id):
    return getStudent(g.user, id)

@adminBP.route('/admin/users', methods = ["GET"])
@rolesRequired('admin', 'owner')
def getAllUsers():
    validated = userGetValidator(**request.args)
    return getUsers(**validated)

@adminBP.route('/admin/users/<id>', methods = ["GET"])
@rolesRequired('admin', 'owner')
def getUserData(id):
    return getUser(id)











