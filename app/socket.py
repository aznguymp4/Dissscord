from flask_socketio import SocketIO, emit
# from datetime import datetime
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://dissscord.onrender.com",
        "https://dissscord.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("sendMsg")
def send_msg(data):
    # code to follow
    # print('msg received:', data)
    # data['created_at'] = datetime.now()
    # print(data)
    emit("receiveMsg", data, broadcast=True, include_self=False)

@socketio.on('typing')
def handle_typing(data):
    # {
    # user_id
    # channel_id
    # is_typing
    # }

    # code to follow
    # print('msg received:', data)
    emit('typing', data, broadcast=True, include_self=False)

    # emit('eventName', data, )                                        this sends data back to the sender
    # emit('eventName', data, broadcast=True)                          this sends data to all clients
    # emit('eventName', data, broadcast=True, include_self=False)      this sends data to all OTHER clients