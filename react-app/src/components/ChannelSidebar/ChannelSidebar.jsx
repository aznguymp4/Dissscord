import { useState } from "react";
import { callLeaveServer, callDeleteServer } from "../../redux/server";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./ChannelSidebar.css";
import "./ChannelSidebarHeader.css";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import CreateChannelModal from "../CreateChannelModal";
import UpdateChannelModal from "../UpdateChannelModal";
import ServerEditModal from "../ServerEditModal";
import AccountBar from "../AccountBar/AccountBar";
import OutsideAlerter from "../../util/outsideAlerter";
import ServerInfo from "../Discovery/ServerInfo";
import { useModal } from "../../context/Modal";

const bannerOffsetMax = 87
function ChannelSidebar({ server, channels }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userOwnsServer = server?.owner_id == sessionUser?.id
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [bannerOffset, setBannerOffset] = useState(0)
  const { closeModal } = useModal()
  const { channelId } = useParams()
  const serverBarNameHt = (dropdownOpen? 48 : 135-bannerOffset) + 'px'

  const handleLeaveServer = e => {
    e.preventDefault()
    closeModal()
    if(userOwnsServer) dispatch(callDeleteServer(server?.id))
    else dispatch(callLeaveServer(server?.id))
    location.pathname = '/'
  }

  return (
    <div id="channelSidebar">
      {server && <div id="channelListHeader">
        <OutsideAlerter
          onOutsideClick={()=>setDropdownOpen(false)}
        >
          <div id="channelListHeaderBg" style={server.banner && {backgroundImage:`url('${server.banner}')`, height: serverBarNameHt, [dropdownOpen? 'transitionProperty' : undefined]: 'height'}} onClick={() => setDropdownOpen(x=>!x)}>
            {server?.banner && <>
              <div id="channelListHeaderBgShadow" style={{height:serverBarNameHt}}/>
              <div
                id="channelListHeaderBgCover"
                style={{
                  height: serverBarNameHt,
                  opacity: bannerOffset/bannerOffsetMax + dropdownOpen
                }}
              />
            </>}
            {<div id="channelListHeaderServerName">{server?.displayname}</div>}
            <i className={`fas fa-${dropdownOpen? 'times' : 'chevron-down'}`}/>
          </div>
          <div className={`dropdownMenu${dropdownOpen? '' : ' hidden'}`}>
            <OpenModalMenuItem
              className="dropdownBtn"
              itemText="About Server"
              iconClassName="fas fa-info-circle fa-lg"
              onItemClick={() => setDropdownOpen(false)}
              modalComponent={<ServerInfo server={server} altView='-'/>}
            />
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
      </div>}
      {server && channels && !channels.channel && <div
        id="channelList"
        onScroll={e => {
          setBannerOffset(Math.min(bannerOffsetMax, e.target.scrollTop*.6))
        }}
        style={{
          height: `calc(100vh - ${dropdownOpen? 118 : 205-bannerOffset}px)`
        }}
      >{
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
      <AccountBar/>
    </div>
  );
}

export default ChannelSidebar;
