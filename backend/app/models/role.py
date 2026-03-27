from app.extensions import db

class Role(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(20), unique = True, nullable = False)
    users = db.relationship('User', secondary = 'user_role', back_populates='roles')

    __tablename__ = "role"
