import { csrfFetch } from './csrf';
export const [LOAD_SERVERS,LOAD_MY_SERVERS,RECEIVE_SERVER,REMOVE_SERVER,UPDATE_SERVER] = ['servers/LOAD_SERVERS','servers/LOAD_MY_SERVERS','servers/RECEIVE_SERVER','servers/REMOVE_SERVER','servers/UPDATE_SERVER'];

const loadServers = servers => ({
	type: LOAD_SERVERS,
	servers
});
const receiveServer = server => ({
	type: RECEIVE_SERVER,
	server
});
const loadMyServers = servers => ({
	type: LOAD_MY_SERVERS,
	servers
});

export const callFetchServers = () => dispatch => {
	csrfFetch(`/api/servers`)
	.then(r=>r.json())
	.then(d => dispatch(loadServers(d.servers)))
	.catch(console.error)
};
export const callFetch1Server = serverId => dispatch => {
	csrfFetch(`/api/servers/${serverId}`)
	.then(r=>r.json())
	.then(d => dispatch(receiveServer(d)))
	.catch(console.error)
};
export const callFetchMyServers = () => dispatch => {
	csrfFetch(`/api/users/@me/servers`)
	.then(r=>r.json())
	.then(d => dispatch(loadMyServers(d)))
	.catch(console.error)
};
export const callJoinServer = serverId => dispatch => {
	csrfFetch(`/api/servers/join/${serverId}`)
	.then(r=>r.json())
	.then(d => dispatch(receiveServer(d)))
	.catch(console.error)
}

const serverReducer = (state = { server: {} }, action) => {
	switch (action.type) {
		case LOAD_SERVERS: {
			const serversState = {};
			action.servers.forEach(server => {
				serversState[server.id] = server;
			});
			return serversState;
		}
		case RECEIVE_SERVER:
			return { ...state, [action.server.id]: action.server };
		/* case UPDATE_SERVER:
			return { ...state, [action.server.id]: action.server };
		case REMOVE_SERVER: {
			const newState = { ...state };
			delete newState[action.serverId];
			return newState;
		} */
		default:
			return state;
	}
};
export const myServerReducer = (state = {server:{}}, action) => {
	if(action.type === LOAD_MY_SERVERS) {
		action.type = LOAD_SERVERS
		return { ...serverReducer(state, action), action }
	}
	return state
}
export default serverReducer;