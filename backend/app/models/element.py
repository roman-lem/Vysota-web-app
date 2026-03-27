from app.extensions import db

class Element(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    is_custom = db.Column(db.Boolean, default=False)
    type = db.Column(db.String(50), nullable = False)
    equipment = db.Column(db.String(50), nullable = False)
    score = db.Column(db.Float, nullable = False)
    code = db.Column(db.String(20), nullable = True, unique = True)
    description = db.Column(db.Text, nullable = False)
    image = db.Column(db.String(100))

    __tablename__ = "element"



