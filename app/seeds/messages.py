from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
hello = [
    'Hey there!',
    'Hi!',
    'What\'s up?',
    'Hello!',
    'Howdy!',
    'Yo!',
    'Greetings!',
    'Hiya!',
    'Sup?',
    'Heya!',
    'Salutations!',
    'Aloha!'
]

# Adds a demo user, you can add other users here if you want
def seed_messages():
    for x in range(0,12):
        db.session.add(Message(
            channel_id=(x%6)+1,
            author_id=(x%3)+1,
            content=hello[x]
        ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()
