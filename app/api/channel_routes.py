from flask import Blueprint, request, redirect
from app.models import Channel, db, Message, Server
from flask_login import current_user,login_required

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

#Get All Messages by channel id
@channel_routes.route('/<int:channel_id>/messages')
@login_required
def channel_messages(channel_id):
  """Get a channel by ID"""
  channel = Channel.query.get(channel_id)
  messages = Message.query.filter(Message.channel_id == channel_id).all()

  if channel:
    return [mess.to_dict() for mess in messages]
  else:
    return {"errors": {"message": "Channel couldn't be found"}}, 404

#Get Channel by channel id
@channel_routes.route('/<int:channel_id>')
@login_required
def channel(channel_id):
  """Get a channel by ID"""
  channel = Channel.query.get(channel_id)
  if channel:
    return channel.to_dict()
  else:
    return {"errors": {"message": "Channel couldn't be found"}}, 404

@channel_routes.route('/<int:channel_id>/messages', methods=['POST'])
@login_required
def create_message(channel_id):
  channel = Channel.query.get(channel_id)
  data = request.json
  server = Server.query.get(channel.server_id)

  if current_user in server.joined_users:
    params = {
      "author_id": current_user.id,
      "channel_id": channel_id,
      "content": data["content"]
    }
    message = Message(**params)
    db.session.add(message)
    db.session.commit()
    # print("MESSAGE: -------", message.to_dict())
    redirect('/<int:channel_id>/messages')
    return message.to_dict()
  else:
    return {'errors': {'message': 'You must first join the server before sending a message'}}


#modify Channel
@channel_routes.route('/<int:channel_id>', methods=["PUT"])
@login_required
def modify_channel_name(channel_id):
  data = request.json
  channel = Channel.query.get(channel_id)
  if channel and channel.server.owner_id == current_user.id:
    channel.displayname = data["displayname"]
    db.session.commit()
    return channel.to_dict()
  return redirect('api/auth/unauthorized')

# create a channel based on server id
#it should be a modal

#delete Channel
@channel_routes.route('/<int:channel_id>',methods=['DELETE'])
@login_required
def delete_channel(channel_id):
  channel = Channel.query.get(channel_id)
  if channel:
    if channel.server.owner_id == current_user.id:
      db.session.delete(channel)
      db.session.commit()
      return {"message":"Successfully deleted"}
    else:
      return {"message": "Forbidden"}, 403
  else:
    return {"errors": {"message": "Channel couldn't be found"}}, 404

