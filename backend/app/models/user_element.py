from app.extensions import db

class UserElement(db.Model):
    element_id = db.Column(db.Integer, db.ForeignKey('element.id', name = 'FK_elementId_in_UserElement'), nullable = False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_UserElement'), nullable = False, primary_key = True)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'element_id', name='_user_element_uc'),
    )

    __tablename__ = "user_element"