import { useEffect, useState } from "react";
import { thunkUpdateChannel, spaceToHyphen } from "../../redux/channel";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import DeleteChannelModal from "../DeleteChannelModal/DeleteChannelModal";
import "./UpdateChannelModal.css"

function UpdateChannelModal({channel}) {
    const dispatch = useDispatch();
    const [displayname, setDisplayname] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        setDisplayname(channel.displayname)
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedChannel = {
        displayname
      }

      const serverResponse = await dispatch(
        thunkUpdateChannel(channel, updatedChannel)
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    };

    return <>
      <div id="modalTitle">Edit Channel</div>
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
          <div className="btnText" onClick={closeModal}>Cancel</div>
          <OpenModalMenuItem
            className="btn btnRed"
            itemText="Delete"
            modalComponent={<DeleteChannelModal channel={channel}/>}
          />
          <input type="submit" className={`btnBlue${displayname.length?'':' disabled'}`} value="Confirm" />
          <div id="modalFooterBg"/>
        </div>
      </form>
    </>
  }

  export default UpdateChannelModal;
