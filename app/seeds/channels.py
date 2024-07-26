from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

example_channels = ['off-topic','announcements','memes','gaming','music','tech-talk','off-topic','help-desk','events','introductions','art-showcase','movie-nights','book-club','pet-pics','fitness','foodies','travel','chatting','diy-projects','study-group','coding','mental-health','news','sports','fan-art','chit-chat','suggestions','feedback','voice-chat','bot-commands','giveaways','trading-post','hobbies','fashion','gardening','wellness','job-board','language-learning','jokes','debates','podcasts','streaming','esports','tutorials','challenges','polls','random','nostalgia','career-advice','science','astronomy','history','chat','philosophy','literature','chatting','comics','horror','fantasy','sci-fi']

# Adds a demo user, you can add other users here if you want
def seed_channels():
    for x in range(1,21):
        db.session.add(Channel(server_id = x, displayname = 'general'))
    for i,v in enumerate(example_channels):
        db.session.add(Channel(server_id = (i%20)+1,  displayname = v))

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
