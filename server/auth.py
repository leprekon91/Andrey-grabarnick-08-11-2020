from flask import Blueprint, redirect, url_for, request, flash
from .models.users import User
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/signin')
def login():
    return 'signin'

@auth.route('/api/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    username = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first() 

    if user:
        flash("User already exists!")
        return redirect(url_for('auth.signup'))

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, username=username)
    new_user.set_password(password)
    # add the new user to the database
    new_user.save()
    return redirect(url_for('auth.signin'))

@auth.route('/signout')
def logout():
    return 'Signout'