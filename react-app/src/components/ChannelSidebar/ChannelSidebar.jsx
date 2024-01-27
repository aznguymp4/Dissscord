import { useState } from "react";
import { callLeaveServer, callDeleteServer } from "../../redux/server";
import { thunkLogout } from "../../redux/session";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ChannelSidebar.css";
import "./ChannelSidebarHeader.css";
import "./ChannelSidebarFooter.css";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import CreateChannelModal from "../CreateChannelModal";
import UpdateChannelModal from "../UpdateChannelModal";
import ServerEditModal from "../ServerEditModal";
import AccountConfigModal from "../AccountConfigModal";
import OutsideAlerter from "../../util/outsideAlerter";
import { useModal } from "../../context/Modal";

function ChannelSidebar({ server, channels }) {
  const nav = useNavigate()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userOwnsServer = server?.owner_id == sessionUser?.id
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { closeModal } = useModal()
  const { channelId } = useParams()

  const handleLeaveServer = e => {
    e.preventDefault()
    closeModal()
    if(userOwnsServer) dispatch(callDeleteServer(server?.id))
    else dispatch(callLeaveServer(server?.id))
    location.pathname = '/'
  }

  return (
    <div id="channelSidebar">
      <div id="channelListHeader">
        <OutsideAlerter
          onOutsideClick={()=>setDropdownOpen(false)}
        >
          <div id="channelListHeaderBg" onClick={() => setDropdownOpen(x=>!x)}>
            {server && <div id="channelListHeaderServerName">{server.displayname}</div>}
            <i className={`fas fa-${dropdownOpen? 'times fa-lg' : 'chevron-down'}`}/>
          </div>
          <div className={`dropdownMenu${dropdownOpen? '' : ' hidden'}`}>
            {userOwnsServer && <>
              <OpenModalMenuItem
                className="dropdownBtn"
                itemText="Server Settings"
                iconClassName="fa-solid fa-cog fa-lg"
                onItemClick={() => setDropdownOpen(false)}
                modalComponent={<ServerEditModal server={server}/>}
              />
              <OpenModalMenuItem
                className="dropdownBtn"
                itemText="Add Channel"
                iconClassName="fas fa-circle-plus fa-lg"
                onItemClick={() => setDropdownOpen(false)}
                modalComponent={<CreateChannelModal server={server}/>}
              />
            </>}
            <OpenModalMenuItem
              className="dropdownBtn btnRed"
              itemText={`${userOwnsServer? 'Delete' : 'Leave'} Server`}
              iconClassName={`fas fa-${userOwnsServer?'trash':'sign-out'}-alt fa-lg`}
              onItemClick={() => setDropdownOpen(false)}
              modalComponent={<>
                <div id="modalTitle">{userOwnsServer? 'Delete' : 'Leave'} Server</div>
                <form onSubmit={handleLeaveServer} className="accountForm">
                  <div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to {userOwnsServer? 'delete':'leave'} <b>{server?.displayname}</b>?</div>
                  <br/>
                  <div id="modalFooter">
                    <div className="btnText" onClick={closeModal}>Cancel</div>
                    <input type="submit" className='btnRed' value={`${userOwnsServer? 'Delete' : 'Leave'} Server`}/>
                    <div id="modalFooterBg"/>
                  </div>
                </form>
              </>}
            />
          </div>
        </OutsideAlerter>
      </div>
      {server && !channels.channel && <div id="channelList">{
        Object.values(channels).map(c => <Link
          key={c.id}
          className={`channelLi${channelId==c.id?' select':''}`}
          to={`/server/${server.id}/channel/${c.id}`}
        >
          <div className="channelLiIcon"><img src="/icons/channel/text.svg"/></div>
          <div className="channelLiName">{c.displayname}</div>
          {server.owner_id == sessionUser.id && <div className="iconBtn">
            <OpenModalMenuItem
              itemText={<img src="/icons/settings.svg"/>}
              modalComponent={<UpdateChannelModal channel={c}/>}
            />
            </div>}
        </Link>)
      }</div>}
      <div id="channelListFooter">
        <div id="channelListFooterIcon">
          <img src={sessionUser?.icon}/>
          <div id="channelListFooterIconStatus"></div>
        </div>
        <div id="channelListFooterNames">
          <div id="channelListFooterNameDisplay">{sessionUser?.displayname || sessionUser?.username}</div>
          <div id="channelListFooterNameUser">@{sessionUser?.username}</div>
        </div>
        <OpenModalMenuItem
          className="iconBtn"
          itemText={<img src="/icons/settings.svg"/>}
          modalComponent={<AccountConfigModal/>}
        />
        <OpenModalMenuItem
          className="iconBtn"
          itemText={<img id="channelListFooterLogout" src="/icons/logout.svg"/>}
          modalComponent={<>
            <div id="modalTitle">Log Out</div>
            <form onSubmit={()=>{dispatch(thunkLogout()); closeModal(); nav('/')}} className="accountForm">
              <div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to log out?</div>
              <br/>
              <div id="modalFooter">
                <div className="btnText" onClick={closeModal}>Cancel</div>
                <input type="submit" className='btnRed' value='Log Out'/>
                <div id="modalFooterBg"/>
              </div>
            </form>
          </>}
        />
      </div>
    </div>
  );
}

export default ChannelSidebar;
