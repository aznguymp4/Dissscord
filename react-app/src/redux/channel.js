import { csrfFetch } from './csrf';
export const [LOAD_CHANNELS,LOAD_MY_CHANNELS,RECEIVE_CHANNEL,REMOVE_CHANNEL,UPDATE_CHANNEL] = ['channels/LOAD_CHANNELS','channels/LOAD_MY_CHANNELS','channels/RECEIVE_CHANNEL','channels/REMOVE_CHANNEL','channels/UPDATE_CHANNEL'];

const loadChannels = channels => ({
	type: LOAD_CHANNELS,
	channels
});

export const callFetchChannelsByServerId = (serverId) => dispatch => {
	csrfFetch(`/api/servers/${serverId}/channels`)
	.then(r=>r.json())
	.then(d => dispatch(loadChannels(d.channels)))
	.catch(e => {
		console.error(e)
		alert("Couldn't get channels; Server not found")
	})

	// dispatch(loadChannels([{"id":0,"owner_id":1,"displayname":"Midjourney","desc":"The official channel for Midjourney, a text-to-image AI where your imagination is the only limit.","banner":"https://cdn.discordapp.com/discovery-splashes/662267976984297473/4798759e115d2500fef16347d578729a.jpg?size=600","icon":"https://cdn.discordapp.com/icons/662267976984297473/39128f6c9fc33f4c95a27d4c601ad7db.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":1,"owner_id":2,"displayname":"Genshin Impact Official","desc":"Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!","banner":"https://cdn.discordapp.com/discovery-splashes/522681957373575168/42af24a5dc8c23c7954193f60238d363.jpg?size=600","icon":"https://cdn.discordapp.com/icons/522681957373575168/653957c5315ff8cace5a50e675f29a5d.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":2,"owner_id":3,"displayname":"Honkai: Star Rail Official","desc":"Honkai: Star Rail is a new HoYoverse space fantasy RPG.","banner":"https://cdn.discordapp.com/discovery-splashes/884849473329692723/352def4f57f5ec5f2ce03c5c0dd52374.jpg?size=600","icon":"https://cdn.discordapp.com/icons/884849473329692723/fc10e033219d2a53b1ba28d79e7ec266.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":3,"owner_id":1,"displayname":"MINECRAFT","desc":"The official Minecraft Discord!","banner":"https://cdn.discordapp.com/discovery-splashes/302094807046684672/579507dff86d89cd5decd8e016a54706.jpg?size=600","icon":"https://cdn.discordapp.com/icons/302094807046684672/a_916131f4d4e8c6f6eed9f590a1982725.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":4,"owner_id":2,"displayname":"VALORANT","desc":"The official VALORANT Discord channel, in collaboration with Riot Games. Find the latest news and talk about the game!","banner":"https://cdn.discordapp.com/discovery-splashes/679875946597056683/b27c03d9f875546dd0da4f9a787bce2c.jpg?size=600","icon":"https://cdn.discordapp.com/icons/679875946597056683/e45916c9dbeedc5b5eed61e337b8b322.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":5,"owner_id":3,"displayname":"Official Fortnite","desc":"The Official Fortnite Discord Channel! Join to follow news channels, LFG, and chat.","banner":"https://cdn.discordapp.com/discovery-splashes/322850917248663552/cea90e1c80e87fcb8c9fa79d644902d0.jpg?size=600","icon":"https://cdn.discordapp.com/icons/322850917248663552/edeb29c8c38544f5f2de180c41584438.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":6,"owner_id":1,"displayname":"Deep Rock Galactic","desc":"Official Discord Channel for Deep Rock Galactic - a game about dwarven team spirit, mining and shooting aliens.","banner":"https://cdn.discordapp.com/discovery-splashes/257785731072786435/b27a136f6fe6939af9699b1c31554158.jpg?size=600","icon":"https://cdn.discordapp.com/icons/257785731072786435/a_ad98d7cd13a45adf1227e60740d07efa.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":7,"owner_id":2,"displayname":"Roblox","desc":"The largest community-run Roblox channel. Join for news, chat, LFG, events & more! For both Users and Creators. 🌈 🌻","banner":"https://cdn.discordapp.com/discovery-splashes/150074202727251969/c86ad9f4bd60ca24cd3cabd6664ffde3.jpg?size=600","icon":"https://cdn.discordapp.com/icons/150074202727251969/d3b3767d0e3f07e9da0f74b78dd28dde.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":8,"owner_id":3,"displayname":"THE FINALS","desc":"","banner":"https://cdn.discordapp.com/discovery-splashes/1008696016318513243/2b269cd61236fbf68a5732ac0efbaaad.jpg?size=600","icon":"https://cdn.discordapp.com/icons/1008696016318513243/13391c49934047a27e0d8e95351a315b.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":9,"owner_id":1,"displayname":"Phasmophobia","desc":"Official Discord: Phasmophobia is a 4 player online co-op psychological horror game.","banner":"https://cdn.discordapp.com/discovery-splashes/435431947963990026/fa8ebfdb492fb4ab2cc7763404bbf9ad.jpg?size=600","icon":"https://cdn.discordapp.com/icons/435431947963990026/a_c245db8fae19b25f75ca7e5791b36eec.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":10,"owner_id":2,"displayname":"Apex Legends","desc":"Community run, developer supported Discord channel dedicated to Apex Legends. Join for LFG, Game Discussion, News & more!","banner":"https://cdn.discordapp.com/discovery-splashes/541484311354933258/cb1f6cd5af8d2a8bedc48f826cbe13e0.jpg?size=600","icon":"https://cdn.discordapp.com/icons/541484311354933258/a_e7b09ae6ed2ac51db7ecf537c2943f6a.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":11,"owner_id":3,"displayname":"The Forbidden Trove","desc":"The largest channel for everything Path of Exile related. Join for our trading hub, help rooms, socializing & much more!","banner":"https://cdn.discordapp.com/discovery-splashes/645607528297922560/9e527067a5ee30aa6525c25058b401c9.jpg?size=600","icon":"https://cdn.discordapp.com/icons/645607528297922560/a_c177897c1751abde48b893844811a1a7.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":12,"owner_id":1,"displayname":"Memeology","desc":"Welcome to the funniest dankiest memeiest channel on discord. share and create memes and make friends for life here.","banner":"https://cdn.discordapp.com/discovery-splashes/270613445177638922/82a2190ab7de020eeaa5046f48cb0821.jpg?size=600","icon":"https://cdn.discordapp.com/icons/270613445177638922/a_0d5dc8ca51f18a2c82e2ab3713b731e1.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":13,"owner_id":2,"displayname":"Discord Town Hall","desc":"Welcome to Discord Town Hall—a community run by Discord, for Discord users! Join for the latest product news & events.","banner":"https://cdn.discordapp.com/discovery-splashes/169256939211980800/574dd86e14c475e57f2961bd94724f9a.jpg?size=600","icon":"https://cdn.discordapp.com/icons/169256939211980800/49b72906d1e9cfa902405c83d973cc74.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":14,"owner_id":3,"displayname":"Destiny 2 LFG","desc":"Destiny 2 LFG Channel For All Platforms","banner":"https://cdn.discordapp.com/discovery-splashes/356833056562348042/081342973ccf2537a3433b36af4993c0.jpg?size=600","icon":"https://cdn.discordapp.com/icons/356833056562348042/a_7908c43b1e2f91125a7404c7adcb7372.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":15,"owner_id":1,"displayname":"Geometry Dash","desc":"The official Discord channel for the popular rhythm-based action platformer game, Geometry Dash!","banner":"https://cdn.discordapp.com/discovery-splashes/398627612299362304/4f1fa86af52e9c3af85e63605ec5748d.jpg?size=600","icon":"https://cdn.discordapp.com/icons/398627612299362304/a_a64cce8e78460d703221cad1b4ead7ca.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":16,"owner_id":2,"displayname":"KOR Lost ARK","desc":"한국 로스트아크의 전 서버 모험가들을 위한 커뮤니티 서버입니다.","banner":"https://cdn.discordapp.com/discovery-splashes/660684739056762891/883abb8fb9bdc5f692727594e9d63902.jpg?size=600","icon":"https://cdn.discordapp.com/icons/660684739056762891/a_e15f9ae43092a5d4af576da60024354e.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":17,"owner_id":3,"displayname":"NARAKA: Bladepoint Official","desc":"Official Discord for NARAKA: BLADEPOINT! Chat with other players or join some exclusive events!","banner":"https://cdn.discordapp.com/discovery-splashes/750237703739539497/b799ae3eb9c87ccf51d7aa15e4c72189.jpg?size=600","icon":"https://cdn.discordapp.com/icons/750237703739539497/12990d804b45cbd40616203e98d3526c.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":18,"owner_id":1,"displayname":"Terraria","desc":"Ask questions, join events, win prizes and meet new friends on the official Terraria channel; the #1 rated game on Steam!","banner":"https://cdn.discordapp.com/discovery-splashes/251072485095636994/76aa6106af13a7316d5b040cfe4f27ad.jpg?size=600","icon":"https://cdn.discordapp.com/icons/251072485095636994/a_5b42d90a252983e9e10077114780224f.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"},{"id":19,"owner_id":2,"displayname":"Tower Defense Simulator","desc":"Official Discord Channel for Tower Defense Simulator! Game: https://playtds.paradoxum.games","banner":"https://cdn.discordapp.com/discovery-splashes/587355301083349002/e2fffb794ed696ccfc31c3f144f0fa5b.jpg?size=600","icon":"https://cdn.discordapp.com/icons/587355301083349002/26280a5e9402bd4ae1bc203acbf4e49d.webp?size=80","public":true,"created_at":"Fri, 19 Jan 2024 19:29:58 GMT","updated_at":"Fri, 19 Jan 2024 19:29:58 GMT"}]))
};
const channelReducer = (state = { channel: {} }, action) => {
	switch (action.type) {
		case LOAD_CHANNELS: {
			const channelsState = {};
			action.channels.forEach(channel => {
				channelsState[channel.id] = channel;
			});
			return channelsState;
		}
		/* case RECEIVE_CHANNEL:
			return { ...state, [action.channel.id]: action.channel };
		case UPDATE_CHANNEL:
			return { ...state, [action.channel.id]: action.channel };
		case REMOVE_CHANNEL: {
			const newState = { ...state };
			delete newState[action.channelId];
			return newState;
		} */
		default:
			return state;
	}
};
export default channelReducer;