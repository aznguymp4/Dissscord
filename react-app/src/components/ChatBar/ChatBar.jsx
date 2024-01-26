import { useState, useEffect } from 'react';
import { callFetchMsgsByChannel, callFetch1Msg, callCreateMsg, callEditMsg, callDeleteMsg, receiveMsg } from '../../redux/message';
import { callCreateReaction, callDeleteReaction, receiveReaction, removeReaction } from '../../redux/reaction';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import OutsideAlerter from '../../util/outsideAlerter';
import EmojiPicker from 'emoji-picker-react';
import './ChatBar.css';
import './ChatBarHeader.css';
import './ChatBarFooter.css';

let socket;
let typeTimeout;
function ChatBar({ server }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()
  const channel = useSelector(state => state.channel[channelId])
  const msgs = useSelector(state => state.msg)
  const reactions = useSelector(state => state.reaction)
  const [msgIpt,setMsgIpt] = useState('')
  const [emittedTyping,setEmittedTyping] = useState(false)
  const [reactingTo,setReactingTo] = useState(0)
  const [emojiPickerOffset,setEmojiPickerOffset] = useState([0,0])
  const [typers,setTypers] = useState([])
  const chat = document.getElementById('chatBarContent')
  const [shiftHeld, setShiftHeld] = useState(false);
  useEffect(() => {
    window.addEventListener('keydown', ({key}) => { if (key === 'Shift') setShiftHeld(true) })
    window.addEventListener('keyup', ({key}) => { if (key === 'Shift') setShiftHeld(false) })
  }, [])
  
  const emitTyping = typing => {
    setEmittedTyping(typing)
    socket.emit('typing', {
      name: sessionUser.displayname || sessionUser.username,
      channel_id: channelId,
      is_typing: typing
    })
  }
  const formatTime = (rawTime, formatLen) => {
    const msgTime = new Date(rawTime)
    msgTime.setTime(msgTime.getTime() + msgTime.getTimezoneOffset()*6e4)
    if(formatLen==='full') return msgTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    let now = Date.now();
    let hours = msgTime.getHours();
    let minutes = msgTime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    let diff = now-msgTime.getTime();
    if(formatLen==='timeOnly') return strTime
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
    dispatch(callCreateMsg(channelId, { content: msgIpt.trim() }, newMessage => {
      socket.emit('sendMsg', newMessage)
    }))
    setMsgIpt('')
  }
  const submitReaction = (msgId, emoji) => {
    dispatch(callCreateReaction(msgId, emoji, newReaction => {
      socket.emit('sendReaction', newReaction)
    }))
  }
  const groupReactions = arr => {
    const rIDs = new Set()
    const obj = {}
    for (const r of arr) {
      if(rIDs.has(r.id)) continue
      rIDs.add(r.id)
      const userReacted = r.author_id == sessionUser.id
      if(obj[r.emoji]) {
        obj[r.emoji].count ++
        obj[r.emoji].users.add(r.author_id)
        if(!obj[r.emoji].userReactionId) obj[r.emoji].userReactionId = userReacted? r.id : null
      } else {
        obj[r.emoji] = {
          count: 1,
          users: new Set([r.author_id]),
          userReactionId: userReacted? r.id : null
        }
      }
    }
    return obj
}

  useEffect(()=>{
    socket = io()

    socket.on('receiveMsg', msg => {
      if(msg.channel_id != channelId) return
      dispatch(receiveMsg(msg))
    })
    socket.on('receiveReaction', reaction => {
      dispatch(receiveReaction(reaction))
    })
    socket.on('deleteReaction2', ({msgId, reactionId}) => {
      dispatch(removeReaction(reactionId))
      dispatch(callFetch1Msg(msgId))
    })
    socket.on('typing', data => {
      if(data.is_typing && data.channel_id==channelId) setTypers(arr => [...arr, data.name])
      else setTypers(typers.filter(n => n !== data.name))
    })

    return (()=>{socket.disconnect()})
  }, [channelId])
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
  useEffect(()=>{
    if(chat) chat.scrollTop = chat.scrollHeight
  },[msgs,chat])
  
  return (
    <div id='chatBar'>
      {channel? <>
        <div id='chatBarHeader'>
        <div id='chatBarHeaderIcon'><img src='/icons/channel/text.svg'/></div>
        <div id='chatBarHeaderName'>{channel && channel.displayname}</div>
        </div>
        <div id='chatBarContent'>
          <div id='chatBarSpace'/>
          {
            msgs && Object.values(msgs).sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)).map((m,i,a) => {
              const breakMsgChain = !a[i-1] || (a[i-1].author_id !== m.author_id)
              return <div key={m.id} className={`chatMsg${breakMsgChain?'':' short'}`}>
                <div className='chatMsgLeft'>
                  {breakMsgChain?
                    <img src={msgs && m.author && m.author.icon}/>
                    : <span className='chatMsgDate short' title={formatTime(m.created_at, 'full')}>{formatTime(m.created_at, 'timeOnly')}</span>
                  }
                </div>
                <div className='chatMsgRight'>
                  <div className='chatMsgTop'>
                    {
                      breakMsgChain && <>
                        <span className='chatMsgName'>{msgs && m.author && (m.author.displayname || m.author.username)}</span>
                        <span className='chatMsgDate' title={formatTime(m.created_at, 'full')}>{formatTime(m.created_at)}</span>
                      </>
                    }
                    <div className='chatMsgBtns'>
                      <div
                        className="iconBtn"
                        onClick={e=>{
                          const p = e.currentTarget.getBoundingClientRect()
                          setReactingTo(m.id)
                          setEmojiPickerOffset([p.x,p.y])
                        }}
                      >
                        <img src="/icons/smile.svg"/>
                      </div>
                      {m?.author_id == sessionUser.id &&
                        <div
                          className="iconBtn"
                          onClick={()=>{
                            dispatch(callEditMsg(m.id, prompt('Edit Message', m.content)))
                          }}
                        >
                          <img src="/icons/pencil.svg"/>
                        </div>
                      }
                      {([server?.owner_id, m?.author_id].includes(sessionUser.id)) && <OpenModalMenuItem
                        className="iconBtn"
                        modalComponent={<>
                          <div id="modalTitle">Delete Message</div>
                          <form onSubmit={()=>{dispatch(callDeleteMsg(m.id))}} className="accountForm">
                            <div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to delete this message?</div>
                            <br/>
                            <div id="modalFooter">
                              <div className="btnText" onClick={closeModal}>Cancel</div>
                              <input type="submit" className='btnRed' value='Delete'/>
                              <div id="modalFooterBg"/>
                            </div>
                          </form>
                        </>}
                      >
                        <img src="/icons/trash.svg"/>
                      </OpenModalMenuItem>}
                    </div>
                  </div>
                  <div className='chatMsgTxt'>
                    {m.content}
                    {m.created_at !== m.updated_at && <span className='chatMsgTxtEdited' title={formatTime(m.updated_at,'full')}>(edited)</span>}
                  </div>
                  {(()=>{
                    if(!reactions || !m) return
                    const reactionsFromMsg = m?.reactions || []
                    const reactionsFromState = Object.values(reactions).filter(r => r.message_id==m?.id && r.emoji )
                    const renderGroups = groups => {
                        return Object.keys(groups).map((emoji,idx) => {
                          return <div
                            className={`chatMsgReaction${groups[emoji].users.has(sessionUser.id)?' glow':''}`}
                            key={idx}
                            onClick={e => {
                              if(e.currentTarget.classList[1]==='glow') {
                                dispatch(callDeleteReaction(groups[emoji].userReactionId))
                                socket.emit('deleteReaction', {
                                  msgId: m.id,
                                  reactionId: groups[emoji].userReactionId
                                })
                              } else submitReaction(m?.id, emoji)
                            }} 
                          >
                            <div className='chatMsgReactionEmoji'>{emoji}</div>
                            <div className='chatMsgReactionAmt'>{groups[emoji].count}</div>
                          </div>
                        })
                    }
                    
                    return (reactionsFromMsg.length!=0 || reactionsFromState.length!=0) &&
                    <div className='chatMsgReactions'><>
                      {renderGroups(groupReactions([...reactionsFromMsg, ...reactionsFromState]))}
                    </></div>
                  })()}
                </div>
              </div>
            })
          }
        </div>
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
        <OutsideAlerter
          onOutsideClick={()=>{setReactingTo(0)}}
        >
          <div
            className='chatReactPicker'
            id='emojiPickerReact'
            data-reactingto={reactingTo}
            style={{
              left: emojiPickerOffset[0]-360+'px',
              top: reactingTo? Math.min(emojiPickerOffset[1], innerHeight-460)+'px' : '200vh'
            }}
          >
            <EmojiPicker
              onEmojiClick={e => {
                submitReaction(+document.getElementById('emojiPickerReact').dataset.reactingto, e.emoji)
                if(!shiftHeld) setReactingTo(0)
              }}
              theme='dark'
              lazyLoadEmojis={true}
            />
          </div>
        </OutsideAlerter>
      </>
      : <div id='chatBarPlaceholder'>
        <img src="/icons/noChannels/dark.svg" alt="No Channel Selected" />
        <h3>SELECT A TEXT CHANNEL</h3>
        <div>Looks like there&apos;s nothing to display here...</div>
      </div>}
    </div>
  );
}

export default ChatBar;
