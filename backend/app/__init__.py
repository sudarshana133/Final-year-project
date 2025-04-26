from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from .routes.forecast_routes import forecast_bp
from .routes.disasters import disaster_bp

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app,supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://admin:adminpass@localhost:5432/disaster_db')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'secret-key')
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .auth.routes import auth_bp
    from .routes.current_weather import current_weather_bp
    from .routes.admin.users import users_bp
    
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(forecast_bp, url_prefix="/api/forecast")
    app.register_blueprint(disaster_bp, url_prefix="/api/disasters")
    app.register_blueprint(current_weather_bp, url_prefix="/api/current_weather")
    app.register_blueprint(users_bp, url_prefix="/api/admin")
    return app
