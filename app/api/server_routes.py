from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Server, Channel, db

server_routes = Blueprint('servers', __name__)


#GET ALL PUBLIC SERVERS
@server_routes.route('/')
def servers():
	servers = Server.query.filter(Server.public == True)
	return { 'servers': [server.to_dict() for server in servers]}


#GET SINGLE SERVER BY SERVER ID
@server_routes.route('/<int:id>')
@login_required
def single_server(id):
	server = Server.query.get(id)
	if server:
		return server.to_dict()
	else:
		return {'errors': {'message': "Server Not Found"}}, 404


#GET ALL CHANNELS OF A SERVER BY SERVER ID
@server_routes.route('/<int:id>/channels')
def channels(id):
	"""
	Get all channels of a server by server id
	"""
	channels = Channel.query.filter(Channel.server_id == id).all()
	if channels:
		return {"channels": [channel.to_dict() for channel in channels]}
	else:
		return {"errors": {"message": "Server couldn't be found"}}, 404


# CREATE A NEW SERVER
@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
	data = request.json
	user = current_user.to_dict()

	server = Server(
		owner_id = user["id"],
		displayname = data["displayname"],
		icon = data["icon"] if "icon" in data else None,
		desc = data["desc"] if "desc" in data else None,
		banner = data["banner"] if "banner" in data else None,
		public = False if data["public"].lower() == "false" else None
	)

	db.session.add(server)
	db.session.commit()

	new_server = server.to_dict()
	channel = Channel(
		server_id = new_server["id"],
		displayname = "general",
	)

	db.session.add(channel)
	db.session.commit()
	return server.to_dict()


#CREATE A NEW CHANNEL FOR A SERVER BY SERVER ID
@server_routes.route('/<int:id>/channels', methods=["POST"])
@login_required
def add_new_channel(id):
	data = request.json
	server = Server.query.get(id)
	user = current_user.to_dict()
	if not server:
		return {"errors": {"message": "Server couldn't be found"}}, 404

	server_dict = server.to_dict()
	if user["id"] == server_dict["owner_id"]:
		new_channel = Channel(
			server_id = server_dict["id"],
			displayname = data["displayname"]
		)
		db.session.add(new_channel)
		db.session.commit()
		return new_channel.to_dict()
	else:
		return {'errors': {'message': 'Unauthorized'}}, 401


#MODIFY A SERVER BY SERVER ID
@server_routes.route('/<int:id>', methods=["PUT", "PATCH"])
@login_required
def modify_server(id):
	server = Server.query.get(id)
	user = current_user.to_dict()
	if not server:
		return {"errors": {"message": "Server couldn't be found"}}, 404

	if user["id"] == server.owner_id:
		data = request.json

		server.displayname = data["displayname"] if "displayname" in data else server.displayname
		server.icon = data["icon"] if "icon" in data else server.icon
		server.desc = data["desc"] if "desc" in data else server.desc
		server.banner = data["banner"] if "banner" in data else server.banner
		if "public" in data and data["public"].lower() == "true":
			server.public = True
		elif "public" in data and data["public"].lower() == "false":
				server.public = False
		else:
				server.public = server.public
		db.session.commit()
		return server.to_dict()
	else:
		return {'errors': {'message': 'Unauthorized'}}, 401

#DELETE A SERVER BY SERVER ID
@server_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_server(id):
	server = Server.query.get(id)
	user = current_user.to_dict()

	if not server:
		return {"errors": {"message": "Server couldn't be found"}}, 404

	server_to_delete = server.to_dict()

	if user["id"] == server_to_delete["owner_id"]:
		db.session.delete(server)
		db.session.commit()
		return {"message": "Successfully deleted"}
	else:
		return {'errors': {'message': 'Unauthorized'}}, 401


@server_routes.route('/join/<int:server_id>')
@login_required
def join_server(server_id):
		server = Server.query.get(server_id)

		if not server.public:
				return {'errors': {'message': 'Server is not accepting joins'}}, 401

		current_user.joined_servers.append(server)

		db.session.commit()
		return redirect(f'/servers/{server_id}')

@server_routes.route('/search')
def search_server():
	query = request.args.get('query')
	filter_server = Server.query.filter(Server.displayname.ilike(f'%{query}%')).all()
	return [{'id': server.id, 'server_name': server.displayname} for server in filter_server]

