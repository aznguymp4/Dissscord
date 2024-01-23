from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_servers():
    db.session.add(Server(
        owner_id = 1,
        displayname = 'Dissscord Server Test 1',
        banner = 'https://cdn.discordapp.com/attachments/860985407452479508/1199094253285032026/2024-01-22_14.52.24.png',
        desc = 'Join our server! We have an amazing community.',
        public = True
    ))
    db.session.add(Server(
        owner_id = 2,
        displayname = 'Dissscord Server Test 2',
        banner = 'https://cdn.discordapp.com/attachments/860985407452479508/1199094306812735619/2024-01-22_14.52.37.png',
        desc = 'The server that likes to share beautiful photos of nature! 🌲',
        public = True
    ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
        
    db.session.commit()
