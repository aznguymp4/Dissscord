from flask import Blueprint, request
from app.models import Channel, db

channel_routes = Blueprint("channels", __name__)

#might need to go in the servers endpoints if we want to have a url like '/api/servers/:serverId/channels
@channel_routes.route('/<int:id>')
def channels(id):
  """
  Get all channels of a server by server id
  """
  channels = Channel.query.filter(Channel.server_id == id).all()
  print("Channels: ", channels)
  return {"Channels": [channel.to_dict() for channel in channels]}
