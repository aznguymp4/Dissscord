from dotenv import load_dotenv
load_dotenv()

# Regardless of the lint error you receive,
# load_dotenv must run before running this
# so that the environment variables are
# properly loaded.
from app import app, db
from app.models import User

with app.app_context():
    # db.drop_all()
    # db.create_all()

    # # SEED DATA
    # item_count = 0
    # for pokemon in pokemon_data:
    #     pkmn = Pokemon(
    #         number=pokemon['number'],
    #         attack=pokemon['attack'],
    #         defense=pokemon['defense'],
    #         image_url=pokemon['image_url'] if pokemon['captured'] else '/images/unknown.png',
    #         name=pokemon['name'],
    #         type=types.index(pokemon['type']),
    #         moves=','.join(pokemon['moves']),
    #         captured=pokemon['captured'],
    #         encounter_rate=1,
    #         catch_rate=1
    #     )
    #     for y in range(0,3):
    #         item_count += 1
    #         item = Item(
    #             happiness = randint(1,100),
    #             image_url = choice(item_images),
    #             name = f'Random Item #{item_count}',
    #             price = randint(1,100),
    #             pokemon_id = pokemon['number']
    #         )
    #         db.session.add(item)
    #     db.session.add(pkmn)
    user = User.query.get(1)
    db.session.delete(user)

    db.session.commit()
