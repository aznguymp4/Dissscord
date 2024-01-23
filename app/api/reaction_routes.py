from flask import Blueprint, request
from app.models import Reaction, db
from flask_login import current_user, login_required


reaction_routes = Blueprint('reactions', __name__)


@reaction_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_reaction(id):
  reaction = Reaction.query.get(id)
  if reaction and current_user.id == reaction.author_id:
    db.session.delete(reaction)
    db.session.commit()
    return {"message": "Successfully deleted"}
  elif not reaction:
    return {"errors": {"message": "Reaction couldn't be found"}}
  else:
    return {"message": "Forbidden"}, 403
