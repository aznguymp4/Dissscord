from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from random import randint

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    displayname = db.Column(db.String(128))
    bio = db.Column(db.String(256))
    icon = db.Column(db.String(256), default=lambda: f'https://cdn.discordapp.com/embed/avatars/{randint(0,5)}.png')
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    server = db.relationship('Server', back_populates='owner', cascade='all, delete-orphan')
    message = db.relationship('Message', back_populates='author')
    reaction = db.relationship('Reaction', back_populates='author')
    joined_servers = db.relationship('Server', secondary=add_prefix_for_prod('server_users'), back_populates='joined_users')
    # joined_servers = db.relationship('ServerUser')
    # joined_servers = db.relationship('ServerUser', back_populates='user_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'displayname': self.displayname,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'icon': self.icon,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        for mes in new:
            if mes.id == message_id:
                return mes
