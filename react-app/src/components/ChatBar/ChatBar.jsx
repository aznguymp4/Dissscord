import { useState, useEffect } from 'react';
import { callFetchMsgsByChannel, callFetch1Msg, callCreateMsg, editMsg, receiveMsg, removeMsg } from '../../redux/message';
import { callCreateReaction, receiveReaction, removeReaction } from '../../redux/reaction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { io } from 'socket.io-client';
import Message from './Message';
import OutsideAlerter from '../../util/outsideAlerter';
import EmojiPicker from 'emoji-picker-react';
import './ChatBar.css';
import './ChatBarHeader.css';
import './ChatBarFooter.css';

// window.socket;
let typeTimeout;
let txtArea
let defaultHeight
function ChatBar({ server }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams()
  const { setModalContent, closeModal } = useModal()
  const channel = useSelector(state => state.channel[channelId])
  const msgs = useSelector(state => state.msg)
  const [msgIpt,setMsgIpt] = useState('')
  const [emittedTyping,setEmittedTyping] = useState(false)
  const [reactingTo,setReactingTo] = useState(0)
  const [emojiPickerOffset,setEmojiPickerOffset] = useState([0,0])
  const [typers,setTypers] = useState(new Set())
  const chat = document.getElementById('chatBarContent')

  const [shiftHeld, setShiftHeld] = useState(false);
  useEffect(() => {
    window.addEventListener('keydown', ({key}) => { if (key === 'Shift') setShiftHeld(true) })
    window.addEventListener('keyup', ({key}) => { if (key === 'Shift') setShiftHeld(false) })
    window.addEventListener('resize', resizeTxtArea)
  }, [])
  
  const emitTyping = typing => {
    setEmittedTyping(typing)
    window.socket.emit('typing', {
      name: sessionUser.displayname || sessionUser.username,
      channel_id: channelId,
      is_typing: typing
    })
  }

  const resizeTxtArea = () => setTimeout(()=>{
    if(!txtArea) txtArea = document.getElementById('chatBarFooterTxt')
    txtArea.rows = 1
    if(!defaultHeight) defaultHeight = txtArea.scrollHeight
    txtArea.rows = txtArea.scrollHeight==defaultHeight? 1 : ~~(Math.min(txtArea.scrollHeight, window.innerHeight*.5)*.05-1)
  },0)
  const arrayToSentence = arr => {
    if(arr.length==1) return arr[0]
    if(arr.length==2) return arr.join(' and ')
    let last = arr[arr.length-1];
    return arr.slice(0,arr.length-1).join(', ') + ', and ' + last;
  }
  const submitMsg = () => {
    if(!msgIpt.trim()) return
    if(msgIpt.trim().length > 2000) return setModalContent(
      <div id="modalMessageTooLong">
        <div id="modalTitle">Your message is too long...</div>
        <div className='hCaption'>Please edit your message to be under the 2,000 character count limit.</div><br/>
        <div id="modalFooter">
          <div className="btnText"/>
          <div className="btn btnBlue" onClick={closeModal}>Okay</div>
          <div id="modalFooterBg"/>
        </div>
      </div>
    )
    dispatch(callCreateMsg(channelId, { content: msgIpt.trim() }))
    setMsgIpt('')
    resizeTxtArea()
  }
  const submitReaction = (msgId, emoji) => dispatch(callCreateReaction(msgId, emoji))
  

  useEffect(()=>{
    window.socket = io()

    window.socket.on('receiveMsg', msg => {
      if(msg.channel_id == channelId) dispatch(receiveMsg(msg))
    })
    window.socket.on('editMsg', msg => {
      if(msg.channel_id == channelId) dispatch(editMsg(msg))
    })
    window.socket.on('deleteMsg', msgId => {
      dispatch(removeMsg(msgId))
    })
    window.socket.on('receiveReaction', reaction => {
      dispatch(receiveReaction(reaction))
    })
    window.socket.on('deleteReaction2', ({msgId, reactionId}) => {
      dispatch(removeReaction(reactionId))
      dispatch(callFetch1Msg(msgId))
    })
    window.socket.on('typing', data => {
      if(data.is_typing && data.channel_id==channelId) setTypers(set => new Set([...set, data.name]))
      else setTypers(set => new Set([...set].filter(n => n!=data.name)))
    })

    return (()=>{window.socket.disconnect()})
  }, [channelId])
  useEffect(()=>{
    const isTyping = msgIpt?true:false
    if(isTyping === emittedTyping) return
    emitTyping(isTyping)
  },[msgIpt, channelId, sessionUser])
  useEffect(()=>{
    setTypers(new Set())
    setMsgIpt('')
    resizeTxtArea()
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
            msgs && Object.values(msgs)
            .filter(m=>m.channel_id==channelId)
            .sort((a,b)=>new Date(a.created_at)-new Date(b.created_at))
            .map((m,i,a) => 
              m.id && <Message
                key={m.id}
                msg={m}
                server={server}
                func={{
                  setReactingTo,
                  setEmojiPickerOffset,
                  submitReaction,
                  shiftHeld
                }}
                fullHeight={!a[i-1] || (a[i-1].author_id !== m.author_id)}
              />
            )
          }
        </div>
        <div id='chatBarFooter'>
          <div id='chatBarFooterInput'>
            <textarea
              id='chatBarFooterTxt'
              rows={1}
              placeholder={`Message #${channel && channel.displayname}`}
              value={msgIpt}
              onChange={e => {
                setMsgIpt(e.target.value)
                resizeTxtArea()
              }}
              onKeyDown={e => {
                if(e.shiftKey || e.key !== 'Enter') return
                e.preventDefault()
                submitMsg()
              }}
            />
            <div id="chatBarFooterLine"/>
            <div id='chatBarFooterSend'
              onClick={submitMsg}
            >
              <img className={msgIpt.trim().length?'':'btnDisabled'} src='/icons/send.svg'/>
            </div>
          </div>
          <div id='chatBarFooterType'>{
            <> {(typers.size!=0) && <>
              <img src='/icons/typing.gif'/>
              <span>
                {typers.size <= 3?
                  <><b>{arrayToSentence([...typers])}</b> {typers.size==1?'is':'are'} typing...</>
                  : <>Several people are typing...</>
                }
              </span>
            </>}
              {(2000 - msgIpt.trim().length) <= 200 && <div style={{color:2000-msgIpt.trim().length < 0? '#f85b60' : '#bcbec2'}} id='chatBarCharLimit'>{2000 - msgIpt.trim().length}</div>}
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
                if(!shiftHeld) setReactingTo(0)
                submitReaction(+document.getElementById('emojiPickerReact').dataset.reactingto, e.emoji)
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
