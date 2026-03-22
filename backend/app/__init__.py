import os
from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate
from app.routes.student_routes import studentBp
from app.routes.login_routers import loginBP
from app.routes.admin_routes import adminBP
from app.services.login_service import authRequired
from dotenv import load_dotenv
from app.errors import register_error_handlers

from app.models.role import Role
from app.extensions import db

roles = ["owner", "admin", "trainer"]

def createApp():
    load_dotenv()
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    CORS(app, origins="http://localhost:5173")
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(studentBp)
    app.register_blueprint(loginBP)
    app.register_blueprint(adminBP)

    app.before_request(authRequired)
    
    register_error_handlers(app)

    with app.app_context():
        db.create_all()
        for role in roles:
            foundRole = Role.query.filter_by(name = role).all()
            if not foundRole:
                r = Role(
                    name = role
                )
                db.session.add(r)
        db.session.commit()
        
    return app

