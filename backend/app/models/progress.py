from app.extensions import db

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', name = 'FK_studentId_in_Progress'), nullable = False)
    element_id = db.Column(db.Integer, db.ForeignKey('element.id', name = 'FK_elementId_in_Progress'), nullable = False)
    progress = db.Column(db.Integer, nullable = False)

    __table_args__ = (
        db.UniqueConstraint('element_id', 'student_id', name='_element_student_uc'),
        db.CheckConstraint(progress >= 0, name='non_negative'),
        db.CheckConstraint(progress <= 2, name='less_then_3')
    )

    __tablename__ = "progress"