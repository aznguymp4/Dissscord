import { useEffect, useState } from "react";
import { thunkUpdateChannel } from "../../redux/channel";
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

    return (
      <>
        <h2>Edit Channel</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Channel Name
            <input
              type="text"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              required
            />
          </label>
          {errors.displayname && <p>{errors.displayname}</p>}
          <div>
          <OpenModalMenuItem
            className="btn"
            itemText="Delete"
            modalComponent={<DeleteChannelModal channel={channel}/>}
          />
          </div>
          <div id="updateChannelFooter">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </>
    );
  }

  export default UpdateChannelModal;
