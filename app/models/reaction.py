from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
    emoji = db.Column(db.String(16))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    author = db.relationship('User', back_populates='reaction')
    message = db.relationship('Message', back_populates='reaction')

    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'message_id': self.message_id,
            'emoji': self.emoji,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }