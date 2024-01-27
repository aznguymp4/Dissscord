import { csrfFetch } from './csrf';
export const [LOAD_REACTIONS,LOAD_MY_REACTIONS,RECEIVE_REACTION,REMOVE_REACTION,UPDATE_REACTION] = ['reactions/LOAD_REACTIONS','reactions/LOAD_MY_REACTIONS','reactions/RECEIVE_REACTION','reactions/REMOVE_REACTION','reactions/UPDATE_REACTION'];
import { receiveMsg } from './message';

const loadReactions = reactions => ({
	type: LOAD_REACTIONS,
	reactions
});
export const receiveReaction = reaction => ({
	type: RECEIVE_REACTION,
	reaction
})
export const removeReaction = reactionId => ({
	type: REMOVE_REACTION,
	reactionId
})
export const editReaction = reaction => ({
	type: UPDATE_REACTION,
	reaction
});
/* 
export const callFetchReactionsByMessage = msgId => dispatch => {
	csrfFetch(`/api/channels/${channelId}/messages`)
	.then(r=>r.json())
	.then(d => dispatch(loadReactions(d)))
	.catch(e => {
		console.error(e)
		dispatch(loadReactions([]))
		// alert("Couldn't get reactions; Server not found")
	})
}; */
export const callCreateReaction = (messageId, emoji) => dispatch => {
	csrfFetch(`/api/messages/${messageId}/reactions`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({emoji}),
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(receiveReaction(d))
		window.socket.emit('sendReaction', d)
	})
	.catch(console.error)
}
export const callDeleteReaction = reactionId => dispatch => {
	csrfFetch('/api/reactions/'+reactionId, { method: 'DELETE' })
	.then(r=>r.json())
	.then(msg => {
		dispatch(removeReaction(reactionId))
		dispatch(receiveMsg(msg))
		window.socket.emit('deleteReaction', { reactionId, msgId: msg.id })
	})
	.catch(console.error)
}
/* export const callEditReaction = (reactionId, content) => dispatch => {
	csrfFetch('/api/messages/'+reactionId, {
		method: 'PUT',
		body: JSON.stringify({content})
	})
	.then(r=>r.json())
	.then(d => {
		dispatch(editReaction(d))
	})
	.catch(console.error)
}
 */
const reactionReducer = (state = { reaction: {} }, action) => {
	switch (action.type) {
		case LOAD_REACTIONS: {
			const reactionsState = {};
			action.reactions.forEach(reaction => {
				reactionsState[reaction.id] = reaction;
			});
			return reactionsState;
		}
		case RECEIVE_REACTION:
			return { ...state, [action.reaction.id]: action.reaction };
		case UPDATE_REACTION:
			return { ...state, [action.reaction.id]: action.reaction };
		case REMOVE_REACTION: {
			const newState = { ...state };
			delete newState[action.reactionId];
			return newState;
		}
		default:
			return state;
	}
};
export default reactionReducer;