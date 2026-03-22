from app.extensions import db
from app.models.user_role import UserRole

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable = False, unique = True)
    password = db.Column(db.String(200), nullable = False)
    roles = db.relationship('Role', secondary = 'user_role', back_populates='users')
    students = db.relationship('Student', secondary = 'student_user', back_populates='trainers')
    def hasRole(self, *names):
        return any(role.name in names for role in self.roles)
    