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
            <input
              type="text"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <button type="submit">Create Channel</button>
        </form>
      </>
    );
  }

  export default CreateChannelModal;
