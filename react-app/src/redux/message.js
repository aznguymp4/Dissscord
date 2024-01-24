import { csrfFetch } from './csrf';
export const [LOAD_MSGS,LOAD_MY_MSGS,RECEIVE_MSG,REMOVE_MSG,UPDATE_MSG] = ['msgs/LOAD_MSGS','msgs/LOAD_MY_MSGS','msgs/RECEIVE_MSG','msgs/REMOVE_MSG','msgs/UPDATE_MSG'];

const loadMsgs = msgs => ({
	type: LOAD_MSGS,
	msgs
});
export const receiveMsg = msg => ({
	type: RECEIVE_MSG,
	msg
})
export const removeMsg = msgId => ({
	type: REMOVE_MSG,
	msgId
})
export const editMsg = msg => ({
	type: UPDATE_MSG,
	msg
});

export const callFetchMsgsByChannel = channelId => dispatch => {
	csrfFetch(`/api/channels/${channelId}/messages`)
	.then(r=>r.json())
	.then(d => dispatch(loadMsgs(d)))
	.catch(e => {
		console.error(e)
		dispatch(loadMsgs([]))
		// alert("Couldn't get msgs; Server not found")
	})
};
export const callCreateMsg = (channelId, body) => dispatch => {
	csrfFetch(`/api/channels/${channelId}/messages`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(receiveMsg(d))
	})
	.catch(console.error)
}
export const callDeleteMsg = msgId => dispatch => {
	csrfFetch('/api/messages/'+msgId, { method: 'DELETE' })
	.then(() => dispatch(removeMsg(msgId)))
	.catch(console.error)
}

const msgReducer = (state = { msg: {} }, action) => {
	switch (action.type) {
		case LOAD_MSGS: {
			const msgsState = {};
			action.msgs.forEach(msg => {
				msgsState[msg.id] = msg;
			});
			return msgsState;
		}
		case RECEIVE_MSG:
			return { ...state, [action.msg.id]: action.msg };
		/* case UPDATE_MSG:
			return { ...state, [action.msg.id]: action.msg }; */
		case REMOVE_MSG: {
			const newState = { ...state };
			delete newState[action.msgId];
			return newState;
		}
		default:
			return state;
	}
};
export default msgReducer;