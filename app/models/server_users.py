from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .server import Server

class ServerUser(db.Model):
    __tablename__ = 'server_users'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    server_id = db.Column(db.Integer, db.ForeignKey(Server.id), primary_key=True)
    # server_id = db.Column(db.Integer, db.ForeignKey(Server.id))

# server_users = db.Table(
#     add_prefix_for_prod('server_users'),
#     db.Column('user_id', db.Integer, db.ForeignKey(User.id), primary_key=True),
#     db.Column('server_id', db.Integer, db.ForeignKey(Server.id), primary_key=True)
# )