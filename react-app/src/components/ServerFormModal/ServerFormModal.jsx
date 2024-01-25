import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { callCreateServer } from "../../redux/server";

function ServerFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [displayname, setDisplayname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setpreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("imageUpload").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('displayname', displayname);
    // if (selectedImage) {
    //   formData.append('icon', selectedImage);
    // }

    try {
      const serverResponse = await dispatch(callCreateServer({displayname}));
      if (serverResponse.error) {
        setErrors(serverResponse.error);
      } else {
        closeModal();
      }
    } catch (error) {
    //   console.error("Error creating server:", error);
    }
  };

  return (
    <>
      <div id="modalTitle">Customize Your Server</div>
      <p>Give your new server a personality with a name and an icon. You can always change it later.</p>

      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        accept="image/*"
      />

      {preview ? (
        <div onClick={triggerFileInput}>
          <img src={preview} alt="Image preview" style={{ width: '80px', height: '80px', cursor: 'pointer',borderRadius:'50%' }} />
        </div>
      ) : (
        <button onClick={triggerFileInput}>Upload</button>
      )}

      <form onSubmit={handleSubmit}>
        <label>SERVER NAME
          <input
            type="text"
            name="displayname"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
            required
          />
        </label>
        <div>By creating a server, you agree to Dissscord&apos;s Community Guidelines.</div>
        <input type="submit" value="Create" />
      </form>
    </>
  );
}

export default ServerFormModal;
