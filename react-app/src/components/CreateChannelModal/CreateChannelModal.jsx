import { useState } from "react";
import { thunkCreateChannel } from "../../redux/channel";
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

      const newChannel = {
        displayname
      }

      const serverResponse = await dispatch(
        thunkCreateChannel(server, newChannel)
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    };

    return (
      <>
        <h1>Create Channel</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Channel Name
            <div>
                <span className="channelLiIcon"><img src="/icons/channel/text.svg"/></span>
                <input
                  type="text"
                  placeholder="new-channel"
                  value={displayname}
                  onChange={(e) => setDisplayname(e.target.value)}
                  required
                />
            </div>
          </label>
          {errors.displayname && <p>{errors.displayname}</p>}
          <button type="submit">Create Channel</button>
        </form>
      </>
    );
  }

  export default CreateChannelModal;
