from flask import Blueprint, jsonify, request 
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/@me')
@login_required
def get_current_user():
    return current_user.to_dict()

@user_routes.route('/@me', methods=['PUT'])
@login_required
def update_current_user():
    data = request.json

    user = User.query.get(current_user['id'])
    # current_user.displayname = data['displayname']
    # current_user.username = data['username']
    # current_user.email = data['email']
    # current_user.bio = data['bio']
    # current_user.icon = data['icon']

    for key in ['displayname','username','email','bio','icon']:
        user[key] = current_user[key] if data[key] is None else data[key]

    db.session.commit()
    return current_user.to_dict()