import { useSelector, useDispatch } from 'react-redux';
import { callDeleteReaction } from '../../redux/reaction';
import { callDeleteMsg } from '../../redux/message';
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import MessageEditModal from './MessageEditModal';
import { useModal } from "../../context/Modal";

const Message = ({ msg, fullHeight, server, func }) => {
	const sessionUser = useSelector((state) => state.session.user);
  const reactions = useSelector(state => state.reaction)
	const dispatch = useDispatch()
	const { closeModal } = useModal()

	const submitDeleteMsg = mId => {
		closeModal()
		dispatch(callDeleteMsg(mId))
	}
	
	return <div key={msg.id} className={`chatMsg${fullHeight?'':' short'}`}>
		<div className='chatMsgLeft'>
			{fullHeight?
				<img src={msg?.author? msg.author.icon : `https://cdn.discordapp.com/embed/avatars/${msg.id%6}.png`}/>
				: <span className='chatMsgDate short' title={formatTime(msg.created_at, 'full')}>{formatTime(msg.created_at, 'timeOnly')}</span>
			}
		</div>
		<div className='chatMsgRight'>
			<div className='chatMsgTop'>
				{
					fullHeight && <>
						<span className='chatMsgName'>{msg?.author? (msg.author.displayname || msg.author.username) : 'Deleted User'}</span>
						<span className='chatMsgDate' title={formatTime(msg.created_at, 'full')}>{formatTime(msg.created_at)}</span>
					</>
				}
				<div className='chatMsgBtns'>
					<div
						className="iconBtn"
						onClick={e=>{
							const p = e.currentTarget.getBoundingClientRect()
							func.setReactingTo(msg.id)
							func.setEmojiPickerOffset([p.x,p.y])
						}}
					>
						<img src="/icons/smile.svg"/>
					</div>
					{msg?.author_id == sessionUser?.id &&
						<OpenModalMenuItem
							className="iconBtn"
							modalComponent={<MessageEditModal msg={msg}/>}
						>
							<img src="/icons/pencil.svg"/>
						</OpenModalMenuItem>
					}
					{([server?.owner_id, msg?.author_id].includes(sessionUser.id)) && <OpenModalMenuItem
						className="iconBtn"
						modalComponent={<>
							<div id="modalTitle">Delete Message</div>
							<form onSubmit={e=>{e.preventDefault(); submitDeleteMsg(msg.id)}} className="accountForm">
								<div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to delete this message?</div>
								<br/>
								<div id="modalFooter">
									<div className="btnText" onClick={closeModal}>Cancel</div>
									<input type="submit" className='btnRed' value='Delete'/>
									<div id="modalFooterBg"/>
								</div>
							</form>
						</>}
					>
						<img src="/icons/trash.svg"/>
					</OpenModalMenuItem>}
				</div>
			</div>
			<div className='chatMsgTxt'>
				{msg.content}
				{msg.created_at !== msg.updated_at && <span className='chatMsgTxtEdited' title={formatTime(msg.updated_at,'full')}>(edited)</span>}
			</div>
			{(()=>{
				if(!reactions || !msg) return
				const reactionsFromMsg = msg?.reactions || []
				const reactionsFromState = Object.values(reactions).filter(r => r.message_id==msg?.id && r.emoji )
				const renderGroups = groups => {
						return Object.keys(groups).map((emoji,idx) => {
							return <div
								className={`chatMsgReaction${groups[emoji].users.has(sessionUser.id)?' glow':''}`}
								key={idx}
								onClick={e => {
									if(e.currentTarget.classList[1]==='glow') dispatch(callDeleteReaction(groups[emoji].userReactionId, msg.id))
									else func.submitReaction(msg?.id, emoji)
								}} 
							>
								<div className='chatMsgReactionEmoji'>{emoji}</div>
								<div className='chatMsgReactionAmt'>{groups[emoji].count}</div>
							</div>
						})
				}
				
				return (reactionsFromMsg.length!=0 || reactionsFromState.length!=0) &&
				<div className='chatMsgReactions'><>
					{renderGroups(groupReactions([...reactionsFromMsg, ...reactionsFromState], sessionUser.id))}
				</></div>
			})()}
		</div>
	</div>
}

function formatTime(rawTime, formatLen) {
	const msgTime = new Date(rawTime)
	msgTime.setTime(msgTime.getTime() + msgTime.getTimezoneOffset()*6e4)
	if(formatLen==='full') return msgTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
	let now = Date.now();
	let hours = msgTime.getHours();
	let minutes = msgTime.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	let diff = now-msgTime.getTime();
	if(formatLen==='timeOnly') return strTime
	if(diff<864e5) { // 24hr
		return 'Today at '+strTime;
	} else if(diff<1728e5) { // 48hr
		return 'Yesterday at '+strTime;
	} else {
		return msgTime.toLocaleDateString();
	}
}
function groupReactions(arr, sessionUserId) {
	const rIDs = new Set()
	const obj = {}
	for (const r of arr) {
		if(rIDs.has(r.id)) continue
		rIDs.add(r.id)
		const userReacted = r.author_id == sessionUserId
		if(obj[r.emoji]) {
			obj[r.emoji].count ++
			obj[r.emoji].users.add(r.author_id)
			if(!obj[r.emoji].userReactionId) obj[r.emoji].userReactionId = userReacted? r.id : null
		} else {
			obj[r.emoji] = {
				count: 1,
				users: new Set([r.author_id]),
				userReactionId: userReacted? r.id : null
			}
		}
	}
	return obj
}

export default Message