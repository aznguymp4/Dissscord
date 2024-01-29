import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom";
import { callJoinServer } from "../../redux/server";
import './ServerInfo.css'

const ServerInfo = ({ server, altView }) => {
	const dispatch = useDispatch()
	const nav = useNavigate()
	const sessionUser = useSelector(state => state.session.user);
	const myServers = useSelector(state => state.myServer)
	const { closeModal } = useModal()

	const joinServer = async serverId => {
		dispatch(callJoinServer(serverId))
	}

	return <div id="modalServer">
		<div id="modalTitle">Server Info</div>
		<img id="modalServerBanner" src={server.banner}/>
		<img id="modalServerIcon" src={server.icon}/>
		<div id="modalServerOwner" title={`Server Owner: @${server.owner.username}`}>
			<img id="modalServerOwnerIcon" src={server.owner.icon}/>
			<div id="modalServerOwnerName"><div>SERVER OWNER</div>{server.owner.displayname || server.owner.username}</div>
		</div>
		<div id="modalServerName">{server.displayname}</div>
		<div id="modalServerDesc">{server.desc}</div>
		<div id="modalFooter">
			{altView? <div className="btnText"/> : <div className="btnText" onClick={closeModal}>Cancel</div>}
			<div className="btn" aria-disabled={sessionUser?'false':'true'} onClick={() => {
				if(!sessionUser) return setModalContent(<LoginFormModal />)
				if(!myServers[server.id]) joinServer(server.id)
				else if(!altView) nav(`/server/${server.id}`)
				closeModal()
			}}>{
				altView? 'Close' : sessionUser && myServers[server.id]? 'View':'Join'
			}</div>
			<div id="modalFooterBg"/>
		</div>
	</div>
}
export default ServerInfo