from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text
import random

example_react = {
    "weather": ['🌙','🌤️','⛅','🌥️','🌦️','🌧️','⛈️','🌩️','🌨️','⛄','💨','💧','🫧','🌊','🌫️'],
    "animals": ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐻‍❄️','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🐣','🪿','🦆','🐦‍⬛','🦅','🦉','🐺','🐗','🐴'],
    "os": ['📱','💻','🖥️','🖨️','🖱️','🕹️','💾','💿']
}

# Adds a demo user, you can add other users here if you want
def seed_reactions():
    for idx,k in enumerate(example_react):
        for msg_id in range(1,80,4):
            db.session.add(Reaction(
                message_id=msg_id+(80*idx),
                author_id=random.randint(1,3),
                emoji=random.choice(example_react[k])
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
