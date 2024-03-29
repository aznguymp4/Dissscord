from flask import Blueprint, request, redirect
from app.models import db, Message, Reaction
from app.forms import MessageForm
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
@message_routes.route('/<int:message_id>', methods=["PUT"])
@login_required
def update_message(message_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  message = Message.query.get(message_id)
  if message.author_id == current_user.id:
    if form.validate_on_submit():
      if message:
        message.content = form.data["content"]
        db.session.commit()
        return message.to_dict()
      else:
        return {'error': {'message': "Message could not be found"}}, 404
    return form.errors, 401
  return redirect('api/auth/unauthorized')

#delete Message
@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
  message = Message.query.get(message_id)
  if message:
    if message.author_id == current_user.id or current_user.id == message.channel.server.owner_id:
      db.session.delete(message)
      db.session.commit()
      return {"message":"Successfully deleted"}
    else:
      return {"message": "Forbidden"}, 403
  else:
    return {"errors": {"message": "Message could not be found"}}, 404


#GET ALL REACTIONS FOR A MESSAGE BY MESSAGE ID
@message_routes.route('/<int:message_id>/reactions')
@login_required
def get_reaction(message_id):
  message = Message.query.get(message_id)
  reactions = Reaction.query.filter(Reaction.message_id == message_id).all()
  if message:
    return {"reactions": [reaction.to_dict() for reaction in reactions]}
  else:
    return {"errors": {"message": "Message couldn't be found"}}, 404


#GET all reactions of a specific reaction by id for a message
@message_routes.route('/<int:message_id>/reactions/<int:reaction_id>')
@login_required
def get_single_reaction(message_id, reaction_id):
  reaction = Reaction.query.get(reaction_id)
  if reaction:
    reactions = Reaction.query.filter(Reaction.emoji == reaction.emoji and Reaction.author_id == reaction.author_id).all()
    return {"reactions": [reaction.to_dict() for reaction in reactions]}
  else:
    return {"errors": {"message": "Reaction couldn't be found"}}, 404


#CREATE REACTION
@message_routes.route('/<int:message_id>/reactions', methods=["POST"])
@login_required
def create_reaction(message_id):
  message = Message.query.get(message_id)
  reactions = Reaction.query.filter(Reaction.message_id == message_id).all()
  reactions_dict = [reaction.to_dict() for reaction in reactions]

  if message:
    data = request.json
    # Check if user already reacted with this emoji
    for react in reactions_dict:
      if react["author_id"] == current_user.id and react["emoji"] == data['emoji']:
        return {"errors": {"message": "Reaction already exists"}}, 403
    # Check if emoji count (not reaction count) is maxed out (20)
    if len({react['emoji'] for react in reactions_dict}) >= 20 and (data['emoji'] not in [r['emoji'] for r in reactions_dict]):
      return {"errors": {"reaction": "Unique reaction limit reached"}}, 403
    new_reaction = Reaction(
      author_id = current_user.id,
      message_id = message_id,
      emoji = data['emoji']
    )

    db.session.add(new_reaction)
    db.session.commit()
    return new_reaction.to_dict()
  else:
    return {"errors": {"message": "Message couldn't be found"}}, 404