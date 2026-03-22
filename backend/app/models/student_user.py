from app.extensions import db

class StudentUser(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', name = 'FK_studentId_in_StudentUser'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_StudentUser'), nullable = False)
    __table_args__ = (
        db.UniqueConstraint('user_id', 'student_id', name='_user_student_uc'),
    )