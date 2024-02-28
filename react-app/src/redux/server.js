import { csrfFetch } from './csrf';
export const [LOAD_SERVERS,RECEIVE_SERVER,REMOVE_SERVER] = ['servers/LOAD_SERVERS','servers/RECEIVE_SERVER','servers/REMOVE_SERVER'];
export const [LOAD_MY_SERVERS,REMOVE_MY_SERVER,RECEIVE_MY_SERVER] = ['servers/LOAD_MY_SERVERS','servers/REMOVE_MY_SERVER','servers/RECEIVE_MY_SERVER']

const loadServers = servers => ({
	type: LOAD_SERVERS,
	servers
});
const receiveServer = server => ({
	type: RECEIVE_SERVER,
	server
});
const receiveMyServer = server => ({
	type: RECEIVE_MY_SERVER,
	server
});
const loadMyServers = servers => ({
	type: LOAD_MY_SERVERS,
	servers
});
const removeServer = serverId => ({
	type: REMOVE_SERVER,
	serverId
})
const removeMyServer = serverId => ({
	type: REMOVE_MY_SERVER,
	serverId
})

export const callCreateServer = body => dispatch => {
    csrfFetch(`/api/servers/new`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	})
    .then(r=>r.json())
    .then(d => {
		dispatch(receiveServer(d))
		location.pathname = `/server/${d.id}`
	})
    .catch(console.error)
}
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
	.then(d => {
		dispatch(receiveServer(d))
		location.pathname = `/server/${serverId}`
	})
	.catch(console.error)
}
export const callLeaveServer = serverId => dispatch => {
	csrfFetch(`/api/users/@me/servers/${serverId}`, {method: 'DELETE'})
	.then(d => dispatch(removeMyServer(d)))
	.catch(console.error)
}
export const callDeleteServer = serverId => dispatch => {
	csrfFetch(`/api/servers/${serverId}`, {method: 'DELETE'})
	.then(d => {
		dispatch(removeServer(d))
		dispatch(removeMyServer(d))
	})
	.catch(console.error)
}
export const callEditServer = (serverId, body, callback) => dispatch => {
	csrfFetch(`/api/servers/${serverId}`, {
		method: 'PUT',
		body: JSON.stringify(body)
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(receiveServer(d))
		dispatch(receiveMyServer(d))
		callback(true, d)
	})
	.catch(e => {
		console.error(e)
		e.json()
		.then(j => callback(false, j))
	})
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
		case REMOVE_SERVER: {
			const newState = { ...state };
			delete newState[action.serverId];
			return newState;
		}
		default:
			return state;
	}
};
export const myServerReducer = (state = {server:{}}, action) => {
	switch (action.type) {
		case LOAD_MY_SERVERS:
			action.type = LOAD_SERVERS
			return { ...serverReducer(state, action), action }
		case REMOVE_MY_SERVER: {
			action.type = REMOVE_SERVER
			return { ...serverReducer(state, action), action }
		}
		case RECEIVE_MY_SERVER: {
			action.type = RECEIVE_SERVER
			return { ...serverReducer(state, action), action }
		}
		default:
			return state;
	}
}
export default serverReducer;
