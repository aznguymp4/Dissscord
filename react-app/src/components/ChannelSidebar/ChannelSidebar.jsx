// import { useState, useEffect } from "react";
// import { callFetchMyServers } from "../../redux/server";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./ChannelSidebar.css";
import "./ChannelSidebarHeader.css";
import "./ChannelSidebarFooter.css";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import CreateChannelModal from "../CreateChannelModal/CreateChannelModal";
import UpdateChannelModal from "../UpdateChannelModal";

function ChannelSidebar({ server, channels }) {
  // const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()

  return (
    <div id="channelSidebar">
      <div id="channelListHeader">
        <div id="channelListHeaderBg">
          {server && <div id="channelListHeaderServerName">{server.displayname}</div>}
          <i className="fas fa-chevron-down"/>
          {server?.owner_id == sessionUser.id && <OpenModalMenuItem
            id="btnLogin"
            className="btn"
            itemText="Add Channel"
            modalComponent={<CreateChannelModal server={server}/>}
          />}
        </div>
      </div>
      {server && !channels.channel && <div id="channelList">{
        Object.values(channels).map(c => <Link
          key={c.id}
          className={`channelLi${channelId==c.id?' select':''}`}
          to={`/server/${server.id}/channel/${c.id}`}
        >
          <div className="channelLiIcon"><img src="/icons/channel/text.svg"/></div>
          <div className="channelLiName">{c.displayname.toLowerCase()}</div>
          {server.owner_id == sessionUser.id && <div className="iconBtn"><OpenModalMenuItem
            itemText={<img src="/icons/settings.svg"/>}
            modalComponent={<UpdateChannelModal channel={c}/>}
          /></div>}
        </Link>)
      }</div>}
      <div id="channelListFooter">
        <div id="channelListFooterIcon">
          <img src={sessionUser.icon}/>
          <div id="channelListFooterIconStatus"></div>
        </div>
        <div id="channelListFooterNames">
          <div id="channelListFooterNameDisplay">{sessionUser.displayname || sessionUser.username}</div>
          <div id="channelListFooterNameUser">@{sessionUser.username}</div>
        </div>
        <div className="iconBtn">
          <img src="/icons/settings.svg"/>
        </div>
      </div>
    </div>
  );
}

export default ChannelSidebar;
