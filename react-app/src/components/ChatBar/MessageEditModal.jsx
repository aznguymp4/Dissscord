import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { callEditMsg } from "../../redux/message";

const MessageEditModal = ({ msg }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [editMsg, setEditMsg] = useState(msg.content)
  const [error, setError] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    if(editMsg.length>2000) return setError('Content exceeds 2,000 characters')

    dispatch(callEditMsg(msg.id, editMsg.trim()))
    closeModal()
  }

	return <>
		<div id="modalTitle">Edit Message</div>
		<form onSubmit={handleSubmit} className="accountForm" style={{maxWidth:'500px'}}>
			<label htmlFor="editMsg">MESSAGE {error && <span>{error}</span>}</label>
			<textarea
				name="editMsg"
				value={editMsg}
				rows="8"
				onChange={(e) => setEditMsg(e.target.value.substr(0,2000))}
			/>
			<div id="modalFooter">
				<div className="btnText" onClick={closeModal}>Cancel</div>
				<input type="submit" className='btnBlue' value='Save'/>
				<div id="modalFooterBg"/>
			</div>
		</form>
	</>
}

export default MessageEditModal