from flask import Blueprint, request
from app.models import Reaction, db
from flask_login import current_user, login_required


reaction_routes = Blueprint('reactions', __name__)


@reaction_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_reaction(id):
  print("****", current_user.id)
  return "test"
