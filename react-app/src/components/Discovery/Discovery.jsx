import { useEffect } from "react";
import { callFetchServers, callJoinServer } from "../../redux/server";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import "./Discovery.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Discovery() {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { setModalContent, closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const servers = useSelector(state => state.server)
  const myServers = useSelector(state => state.myServer)

  useEffect(()=>{
    dispatch(callFetchServers())
  },[dispatch])

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  const joinServer = async serverId => {
    dispatch(callJoinServer(serverId))
    location.pathname = `/server/${serverId}`
  }

  const isAuthStr = sessionUser?' auth':''

  return (
    <>
      <div id="discoveryHeader" className={isAuthStr}>
        <div id="discoveryContent">
          <div id="discoveryTitle">Welcome to Dissscord</div>
          <div id="discoveryButtons">
            {sessionUser?
              <>
                <div id="btnLogout" className="btn" onClick={logout}>Log Out</div>
              </>
              :
              <>
                <OpenModalMenuItem
                  id="btnSignup"
                  className="btn"
                  itemText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
                <OpenModalMenuItem
                  id="btnLogin"
                  className="btn"
                  itemText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </>
            }
          </div>
        </div>
      </div>
      {
        servers && <div className={`serverGrid${isAuthStr}`}>
          {
            Object.values(servers).map(s => s.public && <div
              className="serverTile"
              onClick={() => {
                setModalContent(
                  <div id="modalServer">
                    <div id="modalTitle">Server Info</div>
                    <img id="modalServerBanner" src={s.banner}/>
                    <img id="modalServerIcon" src={s.icon}/>
                    <div id="modalServerOwner" title={`Server Owner: @${s.owner.username}`}>
                      <img id="modalServerOwnerIcon" src={s.owner.icon}/>
                      <div id="modalServerOwnerName"><div>SERVER OWNER</div>{s.owner.displayname || s.owner.username}</div>
                    </div>
                    <div id="modalServerName">{s.displayname}</div>
                    <div id="modalServerDesc">{s.desc}</div>
                    <div id="modalFooter">
                      <div className="btnText" onClick={closeModal}>Cancel</div>
                      <div className="btn" aria-disabled={sessionUser?'false':'true'} onClick={() => {
                        if(!sessionUser) return setModalContent(<LoginFormModal />)
                        if(!myServers[s.id]) joinServer(s.id)
                        else nav(`/server/${s.id}`)
                        closeModal()
                      }}>{
                        myServers[s.id]? 'View':'Join'
                      }</div>
                      <div id="modalFooterBg"/>
                    </div>
                  </div>
                )
              }}
              key={s.id}
            >
              <img className="serverTileBanner" src={s.banner} alt=""/>
              <img className="serverTileIcon" src={s.icon} alt=""/>
              <div className="serverTileInfo">
                <div className="serverTileName">{s.displayname}</div>
                <div className="serverTileDesc">{s.desc}</div>
              </div>
            </div>)
          }
        </div>
      }
    </>
  );
}

export default Discovery;
