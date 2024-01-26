import { useState } from "react";
import { callLeaveServer, callDeleteServer } from "../../redux/server";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./ChannelSidebar.css";
import "./ChannelSidebarHeader.css";
import "./ChannelSidebarFooter.css";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import CreateChannelModal from "../CreateChannelModal";
import UpdateChannelModal from "../UpdateChannelModal";
import { useModal } from "../../context/Modal";

function ChannelSidebar({ server, channels }) {
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
              modalComponent={<CreateChannelModal server={server}/>}
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
              <div id="modalTitle">{userOwnsServer == sessionUser?.id? 'Delete' : 'Leave'} Server</div>
              <form onSubmit={handleLeaveServer} className="accountForm">
                <div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to leave <b>{server?.displayname}</b>?</div>
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
        <div className="iconBtn">
          <img src="/icons/settings.svg"/>
        </div>
      </div>
    </div>
  );
}

export default ChannelSidebar;
