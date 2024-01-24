from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_channels():
    db.session.add(Channel(
        server_id = 1,
        displayname = 'general'
    ))
    db.session.add(Channel(
        server_id = 1,
        displayname = 'qna'
    ))
    db.session.add(Channel(
        server_id = 1,
        displayname = 'memes'
    ))
    db.session.add(Channel(
        server_id = 2,
        displayname = 'chat'
    ))
    db.session.add(Channel(
        server_id = 2,
        displayname = 'dog-pics'
    ))
    db.session.add(Channel(
        server_id = 2,
        displayname = 'photos'
    ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
        
    db.session.commit()
