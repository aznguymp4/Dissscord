from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_servers():
	db.session.add(Server(
		owner_id = 1,
		displayname = 'Midjourney',
		banner = 'https://cdn.discordapp.com/discovery-splashes/662267976984297473/4798759e115d2500fef16347d578729a.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/662267976984297473/39128f6c9fc33f4c95a27d4c601ad7db.webp?size=80',
		desc = 'The official server for Midjourney, a text-to-image AI where your imagination is the only limit.',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'LimeWire - create AI Images, Audio & Video',
		banner = 'https://cdn.discordapp.com/discovery-splashes/1046979304547954728/d0ac123bc0db716e100a5a3a24c62fa8.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/1046979304547954728/bbe5d6097255431300cfc18dd629b876.webp?size=80',
		desc = 'Our active text-to-image AI community powers your journey to generate the best art, images, and design.',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'Leonardo.Ai',
		banner = 'https://cdn.discordapp.com/discovery-splashes/989166677390426132/80bd9e1e74397990e512578c57a2c67a.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/989166677390426132/13c97c36cd88ea7cd4841c486496e544.webp?size=80',
		desc = 'Leonardo.Ai is a generative AI platform for content creation. Create game assets, artwork, design elements, and more!',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'Opera GX',
		banner = 'https://cdn.discordapp.com/discovery-splashes/715121965563772980/1ff2b1ffb031a899616db9526fe68a3b.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/715121965563772980/a_f57ecb02fac34b66b69e5a4dc7103c97.webp?size=80',
		desc = 'The official Discord server of the world\'s first gaming browser.',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'Stable Diffusion',
		banner = 'https://cdn.discordapp.com/discovery-splashes/1002292111942635562/4e3abc3d0df55a3b878942a8cb299fc5.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/1002292111942635562/a_c375b66258cb49d6d9ef0a073a7cafbe.webp?size=80',
		desc = 'Welcome to Stable Diffusion; the home of Stable Models and the Official Stability.AI Community! https://stability.ai/',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'Linus Tech Tips',
		banner = 'https://cdn.discordapp.com/discovery-splashes/375436620578684930/694639d619a4ea23d15d3b428ac14ee3.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/375436620578684930/74eb55102390f6af7644612ee0c8ebd7.webp?size=80',
		desc = 'The LinusTechTips Discord, aka your place to talk tech! lttstore.com',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'buildapc',
		banner = 'https://cdn.discordapp.com/discovery-splashes/286168815585198080/fdfa2b8ef4a6a1c78596f3570d50fff3.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/286168815585198080/a_e1016a9b8d8f7c97dafef6b655e0d1b1.webp?size=80',
		desc = 'All things PC building, part selection, and troubleshooting. Plus discussions on latest tech and games!',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'HackTheBox',
		banner = 'https://cdn.discordapp.com/discovery-splashes/473760315293696010/226dd539525bae4a5da30d85a026e086.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/473760315293696010/c113f75fd9b19b08078fa833494a7a46.webp?size=80',
		desc = 'Get started with hacking in the academy, test your skills against boxes and challenges or chat about infosec with others',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'OpenAI',
		banner = 'https://cdn.discordapp.com/discovery-splashes/974519864045756446/dcbab0dfca5f6c2628566bdcba1f1bd5.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/974519864045756446/d7ec4ed5884437bae0333aa345a97160.webp?size=80',
		desc = 'A space for developers and enthusiasts to collaborate and share creations built with OpenAI\'s powerful models.',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'TryHackMe',
		banner = 'https://cdn.discordapp.com/discovery-splashes/521382216299839518/783d6e6c3fe83873f5ce692230e0eaf1.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/521382216299839518/a_464f9150a46d5e71a3d9d8ac5ee917ef.webp?size=80',
		desc = 'Learn about ethical hacking and information security from the ground up.',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'TechSource Club',
		banner = 'https://cdn.discordapp.com/discovery-splashes/590251368669773830/c397253302ab1527743570346c8a244e.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/590251368669773830/a_f6c4f3fa90ed78f7563e85d0157d1e85.webp?size=80',
		desc = 'The official TechSource Discord server for all your tech topics!',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'PC MASTER RACE',
		banner = 'https://cdn.discordapp.com/discovery-splashes/77710284621357056/f92191c010a206662676903e5e3c19a5.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/77710284621357056/a_f7addffa2db5012915757f3f9013959a.webp?size=80',
		desc = 'PCMR is the biggest PC enthusiast community in the world. Come hang out, chat and/or get tech, build or OC help!',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'Newegg',
		banner = 'https://cdn.discordapp.com/discovery-splashes/500085440221806603/60cf732d96d1dfbf400dbb0962f20f37.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/500085440221806603/12e39ad3b1f8f8dcf352394168fd1a4d.webp?size=80',
		desc = 'The official Newegg.com Discord',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = '快Jing來',
		banner = 'https://cdn.discordapp.com/discovery-splashes/545989978421723138/497424e2d5da05de9b4dbeecfb5cadc6.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/545989978421723138/a_beec6375a466faa4596ad6cec8853adf.webp?size=80',
		desc = '這裡聚集著對電腦硬體、手機、3C、電競周邊有興趣的發燒友們',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'discord.js - Imagine a bot',
		banner = 'https://cdn.discordapp.com/discovery-splashes/222078108977594368/57c8c55553ceeed8a68a283ca8032046.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/222078108977594368/1ad76bddd2af468c31fdb10cbce63d74.webp?size=80',
		desc = 'Support server for discord.js, a Node.js module to interact with the Discord bot API.',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'Home Assistant',
		banner = 'https://cdn.discordapp.com/discovery-splashes/330944238910963714/a46c4d9f62a4072d5ec87dc256b459bc.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/330944238910963714/e6074bd41d936e13867b694aa83a76fd.webp?size=80',
		desc = 'Open source home automation that puts local control and privacy first.',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'BNB Chain',
		banner = 'https://cdn.discordapp.com/discovery-splashes/789402563035660308/bc2781d394e79f40759186b057972cb8.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/789402563035660308/a_17253f01902c58edce2a1bec5eae3582.webp?size=80',
		desc = 'BNB Chain\'s goal is to accelerate adoption of crypto and blockchain technology by onboarding the next billon Web3 users.',
		public = True
	))
	db.session.add(Server(
		owner_id = 3,
		displayname = 'ThrillSeekers',
		banner = 'https://cdn.discordapp.com/discovery-splashes/485613788628910100/4decb5caeed3ffa0cfb8c56c6599bf67.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/485613788628910100/a_b0209779c4bbe860e87deaced7f19c0a.webp?size=80',
		desc = 'This is the Official Thrillseeker discord server! We discuss all things Virtual Reality and gaming and have meetups!',
		public = True
	))
	db.session.add(Server(
		owner_id = 1,
		displayname = 'MechKeys',
		banner = 'https://cdn.discordapp.com/discovery-splashes/190327149696253952/076c4a8a6bb457709bf4f33ae7bc3ed3.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/190327149696253952/a_a327c7a3e43f47a52a845982cf338f61.webp?size=80',
		desc = '',
		public = True
	))
	db.session.add(Server(
		owner_id = 2,
		displayname = 'Finalmouse',
		banner = 'https://cdn.discordapp.com/discovery-splashes/617165353486909441/444b4789539d2f3464f1e60d85562127.jpg?size=600',
		icon = 'https://cdn.discordapp.com/icons/617165353486909441/b87e58e524328480ecc6bf7a5e2fb63d.webp?size=80',
		desc = 'The official Finalmouse Discord server.',
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
