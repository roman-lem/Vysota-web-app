import os
from flask import Flask
from flask_cors import CORS
from app.extensions import db
from app.routes.student_routes import studentBp
from app.routes.login_routers import loginBP
from app.routes.admin_routes import adminBP
from app.routes.element_routes import elementBP
from app.services.login_service import authRequired
from dotenv import load_dotenv
from app.errors import register_error_handlers

from app.models.role import Role
from app.extensions import db

roles = ["owner", "admin", "trainer"]

def createApp():
    load_dotenv()
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    CORS(app, origins="http://localhost:5173")
    db.init_app(app)

    app.register_blueprint(studentBp)
    app.register_blueprint(loginBP)
    app.register_blueprint(adminBP)
    app.register_blueprint(elementBP)

    app.before_request(authRequired)
    
    register_error_handlers(app)

    with app.app_context():
        db.create_all()
        for role in roles:
            exists = db.session.query(Role.id).filter_by(name=role).first()
            if not exists:
                db.session.add(Role(name=role))
        db.session.commit()
        
    return app

