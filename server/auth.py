from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_required, logout_user, current_user, login_user

from . import db, login_manager
from .models.users import User

auth = Blueprint('auth', __name__)


@login_manager.user_loader
def load_user(user_id):
    if user_id is not None:
        return User.query.get(user_id)
    return None


@login_manager.unauthorized_handler
def unauthorized():
    return {"error": "not authorized"}


@auth.route('/api/login', methods=['POST'])
def login():
    form = request.get_json()
    user = User.query.filter_by(username=form["username"]).first()
    if user and user.check_password(password=form["password"]):
        login_user(user)
        return {"name": current_user.username}
    else:
        raise Exception("User login failed")


@auth.route('/api/signup', methods=['POST'])
def signup_post():
    form = request.get_json()
    email = form['email']
    username = form['username']
    password = form['password']

    user = User.query.filter_by(email=email).first()

    if user:
        raise Exception("User already exists!")

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, username=username)
    new_user.set_password(password)
    # add the new user to the database
    new_user.save()
    login_user(new_user)  # Log in as newly created user
    return {"name": current_user.username}


@auth.route('/api/me')
def getUser():
    if current_user.is_authenticated:
        return jsonify(
            isLoggedIn=current_user.is_authenticated,
            email=current_user.email,
            username=current_user.username
            )
    return jsonify(isLoggedIn=current_user.is_authenticated)


@auth.route("/api/logout")
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return "Logged out..."
