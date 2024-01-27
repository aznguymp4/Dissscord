from flask_socketio import SocketIO, emit
# from datetime import datetime
import os

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://dissscord.onrender.com',
        'https://dissscord.onrender.com'
    ]
else:
    origins = '*'

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('sendMsg')
def send_msg(data):
    emit('receiveMsg', data, broadcast=True, include_self=False)

@socketio.on('typing')
def handle_typing(data):
    emit('typing', data, broadcast=True, include_self=False)


@socketio.on('sendReaction')
def send_reaction(data):
    emit('receiveReaction', data, broadcast=True, include_self=False)

@socketio.on('deleteReaction')
def delete_reaction(data):
    emit('deleteReaction2', data, broadcast=True, include_self=False)