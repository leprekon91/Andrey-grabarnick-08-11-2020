import os
from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from server.models import db

migrate = Migrate()
login_manager = LoginManager()


def create_app():
    app = Flask(__name__, static_folder='../view/build', static_url_path='/')
    app.config.from_object(os.environ['APP_SETTINGS'])

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of the api
    from .main import main as main_blueprint
    
    app.register_blueprint(main_blueprint)
    
     # React application
    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    return app
