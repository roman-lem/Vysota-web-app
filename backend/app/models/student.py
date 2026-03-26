from app.extensions import db
from datetime import datetime, timezone

class Student(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    level = db.Column(db.String(50))
    status = db.Column(db.String(50))
    parent_name = db.Column(db.String(100))
    parent_phone = db.Column(db.String(20))
    birth_date = db.Column(db.Date)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_Student'), nullable = False)
    trainers = db.relationship('User', secondary = 'student_user', back_populates='students')

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now(timezone.utc))
    deleted_at = db.Column(db.DateTime, nullable=True)

    def soft_delete(self):
        self.deleted_at = datetime.utcnow()
    
    def restore(self):
        self.deleted_at = None