from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .server import Server

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(Server.id), nullable=False)
    displayname = db.Column(db.String(40))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    server = db.relationship('Server', back_populates='channel')
    message = db.relationship('Message', back_populates='channel', cascade='all, delete-orphan')

    @property
    def display_name(self):
        return self.displayname

    @display_name.setter
    def display_name(self, val):
        self.displayname = val

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'displayname': self.displayname,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
