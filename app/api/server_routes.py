from flask import Blueprint, request
from flask_login import login_required
from app.models import Server, db

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
def servers():
    servers = Server.query.filter(Server.public == True)
    return { 'servers': [server.to_dict() for server in servers]}

@server_routes.route('/<int:id>')
@login_required
def single_server(id):
    server = Server.query.get(id)
    if server:
        return server.to_dict()
    else:
        return {'errors': {'message': "Server Not Found"}}, 404

@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            owner_id=form.data['owner'],
            displayname=form.data['displayname'],
            icon=form.data['icon'],
            public=form.data['public']
        )
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    return form.errors
