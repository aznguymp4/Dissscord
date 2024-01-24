import { useState } from "react";
import { thunkUpdateChannel } from "../../redux/channel";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./UpdateChannelModal.css"

function UpdateChannelModal({server}) {
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
        thunkUpdateChannel(server, newChannel)
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    };

    return (
      <>
        <h1>Overview</h1>
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
          {errors.email && <p>{errors.email}</p>}
          <button type="submit">Save Changes</button>
        </form>
      </>
    );
  }

  export default UpdateChannelModal;
