import { useState, useEffect } from 'react';
import { callFetchMsgsByChannel, callCreateMsg, callDeleteMsg, receiveMsg } from '../../redux/message';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import './ChatBar.css';
import './ChatBarHeader.css';
import './ChatBarFooter.css';

let socket;
let typeTimeout;
function ChatBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()
  const channel = useSelector(state => state.channel[channelId])
  const msgs = useSelector(state => state.msg)
  const [msgIpt,setMsgIpt] = useState('')
  const [emittedTyping,setEmittedTyping] = useState(false)
  const [typers,setTypers] = useState([])
  
  const emitTyping = typing => {
    setEmittedTyping(typing)
    socket.emit('typing', {
      name: sessionUser.displayname || sessionUser.username,
      channel_id: channelId,
      is_typing: typing
    })
  }

  useEffect(()=>{
    socket = io()

    socket.on('receiveMsg', msg => {
      if(msg.channel_id !== channelId) return
      dispatch(receiveMsg(msg))
    })
    socket.on('typing', data => {
      if(data.is_typing && data.channel_id==channelId) setTypers(arr => [...arr, data.name])
      else setTypers(typers.filter(n => n !== data.name))
    })

    return (()=>{socket.disconnect()})
  }, [typers, channelId])

  useEffect(()=>{
    const isTyping = msgIpt?true:false
    if(isTyping === emittedTyping) return

    emitTyping(isTyping)
  },[msgIpt, channelId, sessionUser])

  useEffect(()=>{
    setTypers([])
    setMsgIpt('')
  }, [channelId])

  useEffect(()=>{
    if(!msgIpt) return
    clearTimeout(typeTimeout)
    typeTimeout = setTimeout(() => {
      emitTyping(false)
    }, 5000);
  },[msgIpt])

  useEffect(()=>{
    dispatch(callFetchMsgsByChannel(channelId))
  },[channelId, dispatch])
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
  const arrayToSentence = arr => {
    if(arr.length==1) return arr[0]
    if(arr.length==2) return arr.join(' and ')
    let last = arr[arr.length-1];
    return arr.slice(0,arr.length-1).join(', ') + ', and ' + last;
  }
  const submitMsg = () => {
    if(!msgIpt) return
    socket.emit('sendMsg', {
      author: sessionUser,
      author_id: sessionUser.id,
      channel_id: channelId,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      content: msgIpt.trim()
    })
    dispatch(callCreateMsg(channelId, {
      content: msgIpt.trim()
    }))
    setMsgIpt('')
  }
  
  return (
    <div id='chatBar'>
      <div id='chatBarHeader'>
        <div id='chatBarHeaderIcon'><img src='/icons/channel/text.svg'/></div>
        <div id='chatBarHeaderName'>{channel && channel.displayname}</div>
      </div>
      <div id='chatBarContent'>{
        msgs && Object.values(msgs).sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)).map(m => <div key={m.id} className='chatMsg'>
        <div className='chatMsgLeft'>
          <img src={msgs && m.author && m.author.icon}/>
        </div>
        <div className='chatMsgRight'>
          <div className='chatMsgTop'>
            <span className='chatMsgName'>{msgs && m.author && (m.author.displayname || m.author.username)}</span>
            <span className='chatMsgDate'>{formatTime(new Date(m.created_at))}</span>
            {msgs && m.author && (m.author_id == sessionUser.id) && <div
              className="iconBtn"
              onClick={()=>{
                dispatch(callDeleteMsg(m.id))
              }}  
            >
              <img src="/icons/trash.svg"/>
            </div>}
          </div>
          <div className='chatMsgTxt'>
            {m.content}
            {m.created_at !== m.updated_at && <span className='chatMsgTxtEdited'>(edited)</span>}
          </div>
        </div>
      </div>)
      }</div>
      {(()=>{
        const chat = document.getElementById('chatBarContent')
        if(chat) chat.scrollTop = chat.scrollHeight
      })()}
      <div id='chatBarFooter'>
        <div id='chatBarFooterInput' onInput={e=>setMsgIpt(e.target.value)}>
          <textarea
            id='chatBarFooterTxt'
            rows='1'
            placeholder={`Message #${channel && channel.displayname}`}
            value={msgIpt}
            onChange={e => setMsgIpt(e.target.value)}
          />
          <div id='chatBarFooterSend'
            onClick={submitMsg}
          >
            <img className={msgIpt.length?'':'btnDisabled'} src='/icons/send.svg'/>
          </div>
        </div>
        <div id='chatBarFooterType'>{
          (typers.length!=0) && <>
            <img src='/icons/typing.gif'/>
            <span>
              {typers.length <= 3?
                <><b>{arrayToSentence(typers)}</b> {typers.length==1?'is':'are'} typing...</>
                : <>Several people are typing...</>
              }
            </span>
          </>
        }</div>
      </div>
    </div>
  );
}

export default ChatBar;
