from app.extensions import db

class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', name = 'FK_roleId_in_UserRole'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_UserRole'), nullable = False)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'role_id', name='_user_role_uc'),
    )

    __tablename__ = "user_role"
