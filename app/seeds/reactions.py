from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text
reactions = [
    '😀',
    '👍',
    '🫡'
]

# Adds a demo user, you can add other users here if you want
def seed_reactions():
    for x in range(0,3):
        db.session.add(Reaction(
            message_id=x+1,
            author_id=(x%3)+1,
            emoji=reactions[x]
        ))
    for x in range(0,3):
        db.session.add(Reaction(
            message_id=x+10,
            author_id=(x%3)+1,
            emoji=reactions[x]
        ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))
        
    db.session.commit()
