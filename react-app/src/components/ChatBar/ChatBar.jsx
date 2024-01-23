import { useState, useEffect } from "react";
import { callFetchMsgsByChannel } from "../../redux/message";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ChatBar.css";
import "./ChatBarHeader.css";
import "./ChatBarFooter.css";

function ChatBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()
  const channel = useSelector(state => state.channel[channelId])
  const msgs = useSelector(state => state.msg)
  const [msgIpt,setMsgIpt] = useState('')
  console.log(msgs)

  const formatTime = msgTime => {
    let now = Date.now();
    let hours = msgTime.getUTCHours();
    let minutes = msgTime.getUTCMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    let diff = now-msgTime.getTime();
    if(diff<864e5) { // 24hr
        return 'Today at '+strTime;
    } else if(diff<1728e5) { // 48hr
        return 'Yesterday at '+strTime;
    } else {
        return msgTime.toLocaleDateString();
    }
  }

  useEffect(()=>{
    dispatch(callFetchMsgsByChannel(channelId))
  },[channelId, dispatch])
  
  return (
    <div id="chatBar">
      <div id="chatBarHeader">
        <div id="chatBarHeaderIcon"><img src="/icons/channel/text.svg"/></div>
        <div id="chatBarHeaderName">{channel && channel.displayname}</div>
      </div>
      <div id="chatBarContent">{
        msgs && Object.values(msgs).map(m => <div key={m.id} className="chatMsg">
        <div className="chatMsgLeft">
          <img src={sessionUser.icon}/>
        </div>
        <div className="chatMsgRight">
          <div className="chatMsgTop">
            <span className="chatMsgName">{msgs && m.author && (m.author.displayname || m.author.username)}</span>
            <span className="chatMsgDate">{formatTime(new Date(m.created_at))}</span>
          </div>
          <div className="chatMsgTxt">
            {m.content}
            {m.created_at !== m.updated_at && <span className="chatMsgTxtEdited">(edited)</span>}
          </div>
        </div>
      </div>)
      }</div>
      <div id="chatBarFooter">
        <div id="chatBarFooterInput" onInput={e=>setMsgIpt(e.target.value)}>
          <textarea id="chatBarFooterTxt" rows="1" placeholder={`Message #${channel && channel.displayname}`}></textarea>
          <div id="chatBarFooterSend">
            <img className={msgIpt.length?'':'btnDisabled'} src="/icons/send.svg"/>
          </div>
        </div>
        <div id="chatBarFooterType">
          <img src="/icons/typing.gif"/>
          <span><b>Demo1</b> is typing...</span>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
