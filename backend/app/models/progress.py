from app.extensions import db

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', name = 'FK_studentId_in_Progress'), nullable = False)
    trick_id = db.Column(db.Integer, db.ForeignKey('trick.id', name = 'FK_trickId_in_Progress'), nullable = False)
    progress = db.Column(db.String(20), nullable = False)
    __table_args__ = (
        db.UniqueConstraint('trick_id', 'student_id', name='_trick_student_uc'),
    )