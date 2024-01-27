from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Server, server_users
from app.forms import UserEditForm

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
	form = UserEditForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		current_user.displayname = form.data['displayname'] if 'displayname' in form.data else current_user.displayname
		current_user.username = form.data['username'] if 'username' in form.data else current_user.username
		current_user.email = form.data['email'] if 'email' in form.data else current_user.email
		current_user.bio = form.data['bio'] if 'bio' in form.data else current_user.bio
		current_user.icon = form.data['icon'] if 'icon' in form.data else current_user.icon

		db.session.commit()
		return current_user.to_dict()
	return form.errors, 400

@user_routes.route('/@me/servers')
@login_required
def get_current_user_servers():
	return [server.to_dict() for server in current_user.joined_servers]

@user_routes.route('/@me/servers/<int:server_id>', methods=['DELETE'])
@login_required
def leave_server(server_id):
	server = Server.query.get(server_id)
	if server in current_user.joined_servers:
		current_user.joined_servers.remove(server)
		db.session.commit()
		return {}, 204
	return {'errors': {'message': 'Server not joined'}}, 401


