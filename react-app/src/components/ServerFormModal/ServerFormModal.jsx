import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { callCreateServer } from "../../redux/server";

function ServerFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [displayname, setDisplayname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const [preview, setpreview] = useState(null);
  const [errors, setErrors] = useState({});
  const usersName = sessionUser.displayname || sessionUser.username

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
    dispatch(callCreateServer({ displayname }));
    closeModal()
  };

  return (
    <>
      <div id="modalTitle">Customize Your Server</div>
      <form onSubmit={handleSubmit} className="accountForm">
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



        <label htmlFor="displayname">SERVER NAME {errors.displayname && <span>{errors.displayname}</span>}</label>
        <input
          type="text"
          name="displayname"
          placeholder={`${usersName}'${usersName.endsWith('s')?'':'s'} server`}
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value.substr(0,128))}
        />
        <p>By creating a server, you agree to Dissscord&apos;s Community Guidelines.</p>
        <div id="modalFooter">
          <div className="btnText" onClick={closeModal}>Cancel</div>
          <input type="submit" className={`btnBlue${displayname.length?'':' disabled'}`} value="Create" />
          <div id="modalFooterBg"/>
        </div>
      </form>
    </>
  );
}

export default ServerFormModal;
