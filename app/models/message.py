from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User
from .channel import Channel

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(User.id))
    channel_id = db.Column(db.Integer, db.ForeignKey(Channel.id), nullable=False)
    content = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    author = db.relationship('User', back_populates='message')
    channel = db.relationship('Channel', back_populates='message')
    reaction = db.relationship('Reaction', back_populates='message', cascade='all, delete-orphan')

    @property
    def set_content(self):
        return self.content

    @set_content.setter
    def set_content(self, val):
        self.content = val

    @property
    def ret_channel_id(self):
        return self.channel_id

    @ret_channel_id.setter
    def ret_channel_id(self, val):
        self.channel_id = val

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.to_dict(),
            'author_id': self.author_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'reactions': [r.to_dict() for r in self.reaction],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
