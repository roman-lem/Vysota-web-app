from app.extensions import db

class UserRole(db.Model):
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', name = 'FK_roleId_in_UserRole'), nullable = False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name = 'FK_userId_in_UserRole'), nullable = False, primary_key = True)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'role_id', name='_user_role_uc'),
    )

    __tablename__ = "user_role"
