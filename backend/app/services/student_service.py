import datetime
from datetime import date
from app.models.student import Student
from app.models.student_user import StudentUser
from app.extensions import db


def createStudent(user, **kwargs):
    student = Student(
        name = kwargs['name'],
        level = kwargs['level'],
        parent_name = kwargs['parent_name'],
        parent_phone = kwargs['parent_phone'],
        birth_date = datetime.datetime.strptime(kwargs['birth_date'], '%Y-%m-%d').date(),
        creator_id = user.id
    )
    db.session.add(student)
    db.session.flush()

    student_user = StudentUser(
        student_id = student.id,
        user_id = user.id
    )

    db.session.add(student_user)
    db.session.commit()
    return {'message': 'Student created',
            'data': {},
            'meta': {}}, 200


def deleteStudent(user, ident):
    query = Student.query
    if not user.hasRole('owner', 'admin'):
        query = query.filter(Student.creator_id == user.id)
    student = query.filter(Student.id == ident).first()
    if not student:
        return {'message': 'Student does not find',
            'data': {},
            'meta': {}}, 404
    
    db.session.delete(student)
    db.session.commit()
    return {'message': 'Student deleted',
            'data': {},
            'meta': {}}, 200


def getStudent(user, ident):
    query = Student.query
    if not user.hasRole('owner', 'admin'):
        query = query.filter(Student.creator_id == user.id)
    student = query.filter(Student.id == ident).first()
    if student:
        return {
            'message': 'Student found',
            'data': {
                'id': student.id,
                'name': student.name,
                'level': student.level,
                'parent_name': student.parent_name,
                'parent_phone': student.parent_phone,
                'birth_date': student.birth_date.strftime('%d-%m-%Y')
            },
            'meta': {}
        }, 200
    else:
        return {'message': 'No students found',
                'data': '',
                'meta': ''}, 401
    
def getStudents(user, **kwargs):
    name = kwargs["name"]
    page = int(kwargs['page'])
    limit = int(kwargs['limit'])
    
    strictFilters = {"level", "status"}
    query = Student.query.order_by(Student.id)
    if not user.hasRole('owner', 'admin'):
        query = query.filter(Student.creator_id == user.id)
    for key in strictFilters:
        if kwargs[key] is not None:
            query = query.filter(getattr(Student, key) == kwargs[key])
            
    weakFilters = {"name"}
    for key in weakFilters:
        if kwargs.get(key) is not None:
            column = getattr(Student, key)
            value = kwargs[key]
            query = query.filter(column.ilike(f"%{value}%"))
    
    total = query.count()
    query = query.offset((page - 1)*limit).limit(limit)
    result = [{
        'id': s.id,
        'name': s.name,
        'level': s.level,
        'status': s.status,
        'parent_name': s.parent_name,
        'parent_phone': s.parent_phone,
        'birth_date': s.birth_date.strftime('%d-%m-%Y'),
        'age': int(str((date.today() - s.birth_date)).split('days')[0])//365
    } for s in query.all()]
    return {
        'message': 'Students found',
        'data': result,
        'meta': {
            'page': page,
            'limit': limit,
            'total': total
        }
    }, 200