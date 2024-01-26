import { csrfFetch } from './csrf';
export const [LOAD_CHANNELS,LOAD_MY_CHANNELS,RECEIVE_CHANNEL,REMOVE_CHANNEL,UPDATE_CHANNEL] = ['channels/LOAD_CHANNELS','channels/LOAD_MY_CHANNELS','channels/RECEIVE_CHANNEL','channels/REMOVE_CHANNEL','channels/UPDATE_CHANNEL'];

const loadChannels = channels => ({
	type: LOAD_CHANNELS,
	channels
});

const createChannel = channel => ({
	type: RECEIVE_CHANNEL,
	channel
});

const updateChannel = channel => ({
	type: UPDATE_CHANNEL,
	channel
});

const deleteChannel = channelId => ({
	type: REMOVE_CHANNEL,
	channelId
})

export const callFetchChannelsByServerId = (serverId) => dispatch => {
	csrfFetch(`/api/servers/${serverId}/channels`)
	.then(r=>r.json())
	.then(d => dispatch(loadChannels(d.channels)))
	.catch(e => {
		console.error(e)
		dispatch(loadChannels([]))
	})
};

export const thunkCreateChannel = (server, channel) => dispatch => {
	csrfFetch(`/api/servers/${server.id}/channels`,{
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(channel)
	})
	.then(r=>r.json())
	.then(d => dispatch(createChannel(d)))
	.catch(console.error)
}

export const thunkUpdateChannel = (channel, updatedChannel) => dispatch => {
	csrfFetch(`/api/channels/${channel.id}`,{
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(updatedChannel)
	})
	.then(r=>r.json())
	.then(d => dispatch(updateChannel(d)))
	.catch(console.error)
}

export const thunkDeleteChannel = channelId => dispatch => {
	csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })
	.then(r=>r.json())
	.then(() => dispatch(deleteChannel(channelId)))
	.catch(console.error)
}

export const spaceToHyphen = str => str.toLowerCase().replace(/\W/g,'-').replace(/-{2,}/,'-')
const processChannelName = c => {
	c.rawname = c.displayname
	c.displayname = spaceToHyphen(c.displayname)
	return c
}

const channelReducer = (state = { channel: {} }, action) => {
	switch (action.type) {
		case LOAD_CHANNELS: {
			const channelsState = {};
			action.channels.forEach(channel => {
				channelsState[channel.id] = processChannelName(channel);
			});
			return channelsState;
		}
		case RECEIVE_CHANNEL:
			return { ...state, [action.channel.id]: processChannelName(action.channel) };
		case UPDATE_CHANNEL:
			return { ...state, [action.channel.id]: processChannelName(action.channel) };
		case REMOVE_CHANNEL: {
			const newState = { ...state };
			delete newState[action.channelId];
			return newState;
		}
		default:
			return state;
	}
};
export default channelReducer;
