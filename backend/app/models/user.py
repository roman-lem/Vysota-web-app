from app.extensions import db
from datetime import datetime, timezone

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable = False, unique = True)
    password = db.Column(db.String(200), nullable = False)

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now(timezone.utc))
    deleted_at = db.Column(db.DateTime, nullable=True)

    roles = db.relationship('Role', secondary = 'user_role', back_populates='users')
    students = db.relationship('Student', secondary = 'student_user', back_populates='trainers')

    def hasRole(self, *names):
        return any(role.name in names for role in self.roles)
    
    def soft_delete(self):
        self.deleted_at = datetime.utcnow()
    
    def restore(self):
        self.deleted_at = None

    __tablename__ = "user"