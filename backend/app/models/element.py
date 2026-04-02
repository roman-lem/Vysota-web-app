from app.extensions import db

class Element(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    is_custom = db.Column(db.Boolean, default=False)
    type = db.Column(db.String(50), nullable = False)
    sportsmen_number = db.Column(db.Integer, nullable = False)
    equipment = db.Column(db.String(50), nullable = False)
    score = db.Column(db.Float, nullable = False)
    code = db.Column(db.String(20), nullable = True)
    description = db.Column(db.Text, nullable = False)
    image = db.Column(db.String(100))

    __table_args__ = (
        db.UniqueConstraint('code', name='_element_code_uc'),
    )

    __tablename__ = "element"



