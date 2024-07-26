from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_servers():
	db.session.add(Server(
		owner_id = 1,
		displayname = 'Genshin Impact Official',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-1.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-1.webp',
		desc = 'Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = 'Honkai: Star Rail Official',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-2.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-2.webp',
		desc = 'Honkai: Star Rail is a space fantasy RPG by HoYoverse. Hop aboard the Astral Express and explore the galaxy\'s wonders!',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'VALORANT',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-3.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-3.webp',
		desc = 'The official VALORANT Discord server, in collaboration with Riot Games. Find the latest news and talk about the game!',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'MINECRAFT',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-4.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-4.webp',
		desc = 'The official Minecraft Discord!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = 'Official Fortnite',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-5.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-5.webp',
		desc = 'The Official Fortnite Discord Server! Join to follow news & updates, LFG, and chat about Fortnite Battle Royale.',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'Deep Rock Galactic',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-6.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-6.webp',
		desc = 'Official Discord Server for Deep Rock Galactic - a game about dwarven team spirit, mining and shooting aliens.',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'Once Human',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-7.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-7.webp',
		desc = 'The official Discord server of the game Once Human by Starry Studio. Find the latest news and discuss this game!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = 'Destiny 2 LFG',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-8.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-8.webp',
		desc = 'Destiny 2 LFG Discord: Find fireteams, plan raids, and connect with fellow Guardians. Your next adventure starts here.',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'Roblox',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-9.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-9.webp',
		desc = 'The largest community-run Roblox server. Join for news, chat, LFG, events & more! For both Users and Creators. ✨',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'Rainbow 6',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-10.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-10.webp',
		desc = 'The Rainbow 6 Discord. Keep up with R6 game news, Siege esports, find teammates, and chat about all things Rainbow Six!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = '🌈 Apex Legends',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-11.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-11.webp',
		desc = 'Community run, developer supported Discord server dedicated to Apex Legends. Join for LFG, Game Discussion, News & more!',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'Terraria',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-12.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-12.webp',
		desc = 'Ask questions, join events, win prizes and meet new friends on the official Terraria server; the #1 rated game on Steam!',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'Zenless Zone Zero Official',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-13.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-13.webp',
		desc = 'The official Discord server for HoYoverse\'s all-new urban fantasy ARPG: Zenless Zone Zero',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = 'Wuthering Waves Official',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-14.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-14.webp',
		desc = 'The official Discord server for Wuthering Waves — a story-rich open-world game by Kuro Games.',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'No Hesi',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-15.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-15.webp',
		desc = 'No Hesi, the largest Assetto Corsa server. Dive into high-speed street racing and connect with drivers worldwide.',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'THE FINALS',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-16.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-16.webp',
		desc = 'Welcome, Contestant! Enter the Arena and join the official server for THE FINALS!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = 'Phasmophobia',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-17.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-17.webp',
		desc = 'Official Discord: Phasmophobia is a 4 player online co-op psychological horror game.',
		public = True
	))

	db.session.add(Server(
		owner_id = 3,
		displayname = 'Overwatch 2',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-18.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-18.webp',
		desc = 'The largest community-run Overwatch 2 Discord server. Join us for gameplay discussion, LFG, Overwatch news & more!',
		public = True
	))

	db.session.add(Server(
		owner_id = 1,
		displayname = 'The Forbidden Trove',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-19.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-19.webp',
		desc = 'The largest server for everything Path of Exile related. Join for our trading hub, help rooms, socializing & much more!',
		public = True
	))

	db.session.add(Server(
		owner_id = 2,
		displayname = '🫸A Universal Time⚡',
		banner = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-banner-20.jpeg',
		icon = 'https://app-academy-projects.s3.us-west-2.amazonaws.com/dissscord-icon-20.webp',
		desc = 'A Universal Time is a roblox game that brings several fandoms together, created & worked on by kur, nub, and other devs.',
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
