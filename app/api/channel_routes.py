from flask import Blueprint, request
from app.models import Channel, db

channel_routes = Blueprint("channels", __name__)

#Will need to go in the servers endpoints if we want to have a url like '/api/servers/:serverId/channels
# @channel_routes.route('/<int:server_id>')
# def channels(server_id):
#   """
#   Get all channels of a server by server id
#   """
#   channels = Channel.query.filter(Channel.server_id == server_id).all()
#   if channels:
#     return {"Channels": [channel.to_dict() for channel in channels]}
#   else:
#     return {"errors": {"message": "Server couldn't be found"}}, 404


#Get Channel
@channel_routes.route('/<int:channel_id>')
def channel(channel_id):
  """Get a channel by ID"""
  channel = Channel.query.get(channel_id)
  if channel:
    return channel.to_dict()
  else:
    return {"errors": {"message": "Channel couldn't be found"}}, 404

#modify Channel
@channel_routes.route('/<int:channel_id>', methods=["PUT"])
def modify_channel_name(channel_id):
  data = request.json
  channel = Channel.query.get(channel_id)

  channel.displayname = data["displayname"]
  db.session.commit()
  return channel.to_dict()

# create a channel based on server id
# @channel_routes.route('/int:server_id', methods=["POST"])
# def

#delete Channel
@channel_routes.route('/<int:channel_id>',methods=['DELETE'])
def delete_channel(channel_id):
  channel = Channel.query.get(channel_id)
  if channel:
    db.session.delete(channel)
    db.session.commit()
    return {"message":"Successfully deleted"}
  else:
    return {"errors": {"message": "Channel couldn't be found"}}, 404


