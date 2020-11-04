from flask import Blueprint
# from . import db

auth = Blueprint('auth', __name__)

@auth.route('/signin')
def login():
    return 'signin'

@auth.route('/signup')
def signup():
    return 'Signup'

@auth.route('/signout')
def logout():
    return 'Signout'