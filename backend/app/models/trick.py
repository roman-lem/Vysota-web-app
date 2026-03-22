from app.extensions import db

class Trick(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    props = db.Column(db.String(100), nullable = False)
    category = db.Column(db.String(50), nullable = False)
    name = db.Column(db.String(100), nullable = False)
    full_score = db.Column(db.Integer, nullable = False)
    half_score = db.Column(db.Integer)
    code = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text)
    conditions = db.Column(db.Text)