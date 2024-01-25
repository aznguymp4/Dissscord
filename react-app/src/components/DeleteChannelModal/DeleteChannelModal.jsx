import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteChannel } from '../../redux/channel';
import './DeleteChannelModal.css'


function DeleteChannelModal({channel}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    return dispatch(thunkDeleteChannel(channel.id))
      .then(closeModal);
  };

  return (
    <div id='deleteModal'>
      <h1 id='deleteHeader'>Confirm Delete</h1>
      <div className='deleteModalContent'>
        <p id='deleteConfirmText'>Are you sure you want to delete {channel.displayname}? This cannot be undone.</p>
        <button
        className='bigButton' id='dontDeleteButton'
        onClick={closeModal}
        >Cancel</button>
        <button className='bigButton' id='deleteButton'
        onClick={handleClick}
        >Delete Channel</button>
      </div>
    </div>
  );
}

export default DeleteChannelModal;
