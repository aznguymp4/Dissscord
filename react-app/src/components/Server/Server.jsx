import { useEffect } from "react";
import { callFetch1Server } from "../../redux/server";
import { callFetchChannelsByServerId } from "../../redux/channel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ChannelSidebar from "../ChannelSidebar"
import ChatBar from "../ChatBar"
import "./Server.css";

function Server() {
  const { serverId } = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server[serverId])
  const channels = useSelector(state => state.channel)
  
  useEffect(()=>{
    dispatch(callFetch1Server(serverId))
    dispatch(callFetchChannelsByServerId(serverId))
  },[dispatch, serverId])

  if(!sessionUser) nav('/')

  return (
    <>
      <ChannelSidebar channels={channels} server={server}/>
      <ChatBar server={server}/>
    </>
  );
}

export default Server;
