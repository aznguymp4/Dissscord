import { useState } from "react";
import { thunkCreateChannel, spaceToHyphen } from "../../redux/channel";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateChannelModal.css"

function CreateChannelModal({server}) {
    const dispatch = useDispatch();
    const [displayname, setDisplayname] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!/\w/.test(displayname)) return setErrors({displayname: 'Name is invalid.'});

      const newChannel = {displayname}
      dispatch(thunkCreateChannel(server, newChannel));
      closeModal();
    };

    return <>
      <div id="modalTitle">Create Channel</div>
      <form onSubmit={handleSubmit} className="accountForm">
        <label htmlFor="displayname">CHANNEL NAME {errors.displayname && <span>{errors.displayname}</span>}</label>
        <input
          type="text"
          name="displayname"
          id="modalChannelNameIpt"
          placeholder="new-channel"
          value={displayname}
          onChange={(e) => setDisplayname(spaceToHyphen(e.target.value).substr(0,40))}
        />
        <img id="modalChannelNameIcon" src="/icons/channel/text.svg"/>
        <div id="modalFooter">
          <div className="btnText" onClick={closeModal}>Close</div>
          <input type="submit" className={`btnBlue${displayname.length?'':' disabled'}`} value="Create" />
          <div id="modalFooterBg"/>
        </div>
      </form>
    </>
  }

  export default CreateChannelModal;
