from flask import Blueprint, request
import os
from app.services.student_service import createStudent, deleteStudent, getStudent, getStudents, setStudent
from functools import wraps
from flask import g
from app.errors import ForbiddenError, ValidationError
from app.validators.student_validator import studentGetValidator, studentSetValidator

studentBp = Blueprint('student', __name__)

def isLogged(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if g.user is not None:
            return f(*args, **kwargs)
        else:
            raise ForbiddenError()
    return wrapper


@studentBp.route('/students', methods = ["POST"])
@isLogged
def addStudent():
    if request.json is not None:
        validated = studentSetValidator(**request.json)
        return createStudent(g.user, **validated)
    else:
        raise ValidationError("", "", "")

@studentBp.route('/students', methods = ["GET"])
@isLogged
def getMyStudents():
    validated = studentGetValidator(**request.args)
    return getStudents(g.user, **validated)

@studentBp.route('/students/<id>', methods = ["GET"])
@isLogged
def selectStudent(id):
    return getStudent(g.user, id)

@studentBp.route('/students/<id>', methods = ["DELETE"])
@isLogged
def removeStudent(id):
    return deleteStudent(g.user, id)

@studentBp.route('/students/<id>', methods = ["PATCH"])
@isLogged
def editStudent(id):
    if request.json is not None:
        validated = studentSetValidator(**request.json)
        return setStudent(g.user, id, **validated)
    else:
        raise ValidationError("", "", "")