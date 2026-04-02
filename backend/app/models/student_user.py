from app.extensions import db

class StudentUser(db.Model):
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', name = 'FK_studentId_in_StudentUser'), nullable = False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_StudentUser'), nullable = False, primary_key = True)
    __table_args__ = (
        db.UniqueConstraint('user_id', 'student_id', name='_user_student_uc'),
    )

    __table_name__ = "student_user"