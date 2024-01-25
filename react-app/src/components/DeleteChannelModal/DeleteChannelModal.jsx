import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteChannel } from '../../redux/channel';
import { useParams, useNavigate } from 'react-router-dom';
import './DeleteChannelModal.css'

function DeleteChannelModal({channel}) {
  const dispatch = useDispatch();
  const { serverId } = useParams()
  const nav = useNavigate()
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteChannel(channel.id))
    closeModal()
    nav(`/server/${serverId}`)
  };

  // return (
  //   <div id='deleteModal'>
  //     <h1 id='deleteHeader'>Confirm Delete</h1>
  //     <div className='deleteModalContent'>
  //       <p id='deleteConfirmText'>Are you sure you want to delete {channel.displayname}? This cannot be undone.</p>
  //       <button
  //       className='bigButton' id='dontDeleteButton'
  //       onClick={closeModal}
  //       >Cancel</button>
  //       <button className='bigButton' id='deleteButton'
  //       onClick={handleClick}
  //       >Delete Channel</button>
  //     </div>
  //   </div>
  // );
  return (<>
    <div id="modalTitle">Delete Channel</div>
    <form onSubmit={handleSubmit} className="accountForm">
      <div style={{fontWeight:200}}>Are you sure you want to delete <b>#{channel.displayname}</b>? This cannot be undone.</div>
      <br />
      <div id="modalFooter">
        <div className="btnText" onClick={closeModal}>Cancel</div>
        <input type="submit" className='btnRed' value="Delete Channel"/>
        <div id="modalFooterBg"/>
      </div>
    </form>
  </>)
}

export default DeleteChannelModal;
