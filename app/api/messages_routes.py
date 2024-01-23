from flask import Blueprint, request, redirect
from app.models import Channel, db, Message, Server
from flask_login import current_user,login_required

message_routes = Blueprint("messages", __name__)

#Get single message by message id
@message_routes.route('/<int:message_id>')
@login_required
def channel_message(message_id):
  """Get a message by ID"""
  message = Message.query.get(message_id)
  if message:
    return message.to_dict()
  else:
    return {"errors": {"message": "Message couldn't be found"}}, 404

#modify Message
@message_routes.route('<int:message_id>', methods=["PUT"])
@login_required
def update_message(message_id):
  data = request.json
  message = Message.query.get(message_id)
  if message.author_id == current_user.id:
    if message:
      message.content = data["content"]
      db.session.commit()
      return message.to_dict()
    else:
      return {'error': {'message': "Message could not be found"}}, 404
  return redirect('api/auth/unauthorized')

#delete Message
@message_routes.route('<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
  message = Message.query.get(message_id)
  if message:
    if message.author_id == current_user.id:
      db.session.delete(message)
      db.session.commit()
      return {"message":"Successfully deleted"}
    else:
      return {"message": "Forbidden"}, 403
  else:
    return {"errors": {"message": "Message could not be found"}}, 404
