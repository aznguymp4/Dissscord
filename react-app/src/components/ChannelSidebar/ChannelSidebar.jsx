// import { useState, useEffect } from "react";
// import { callFetchMyServers } from "../../redux/server";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./ChannelSidebar.css";
import "./ChannelSidebarHeader.css";
import "./ChannelSidebarFooter.css";

function ChannelSidebar({ server, channels }) {
  // const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()

  // if server is undefined or list of channels is empty
  if(!server || channels.channel) return
  const isOwner = server.owner_id == sessionUser.id

  return (
    <div id="channelSidebar">
      <div id="channelListHeader">
        <div id="channelListHeaderBg">
          <div id="channelListHeaderServerName">{server.displayname}</div>
        </div>
      </div>
      <div id="channelList">{
        Object.values(channels).map(c => <Link
          key={c.id}
          className={`channelLi${channelId==c.id?' select':''}`}
          to={`/server/${server.id}/channel/${c.id}`}
        >
          <div className="channelLiIcon"><img src="/icons/channel/text.svg"/></div>
          <div className="channelLiName">{c.displayname.toLowerCase()}</div>
          {isOwner && <div className="iconBtn"><img src="/icons/settings.svg"/></div>}
        </Link>)
      }</div>
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
