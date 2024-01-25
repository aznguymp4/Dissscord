from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    displayname = db.Column(db.String(128), nullable = False)
    icon = db.Column(db.String(256), default='https://cdn.discordapp.com/embed/avatars/0.png')
    desc = db.Column(db.String(512), default='This is a Dissscord Server! JOIN NOW 😡')
    banner = db.Column(db.String(256), default='https://cdn.discordapp.com/attachments/860985407452479508/1198067113538093076/default_dissscord_banner.jpg')
    public = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship('User', back_populates='server')
    channel = db.relationship('Channel', back_populates='server', cascade='all, delete-orphan')
    joined_users = db.relationship('User', secondary=add_prefix_for_prod('server_users'), back_populates='joined_servers')
    # joined_users = db.relationship('ServerUser')
    # joined_users = db.relationship('ServerUser', back_populates='server_id')


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'displayname': self.displayname,
            'desc': self.desc,
            'banner': self.banner,
            'icon': self.icon,
            'desc': self.desc,
            'banner': self.banner,
            'public': self.public,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
