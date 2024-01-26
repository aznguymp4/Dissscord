import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { callCreateServer } from "../../redux/server";
import ImagePicker from "../ImagePicker";

function ServerFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [displayname, setDisplayname] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const [icon, setIcon] = useState('');
  const [errors, setErrors] = useState({});
  const usersName = sessionUser.displayname || sessionUser.username
  const placeholder = `${usersName}'${usersName.endsWith('s')?'':'s'} server`

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(callCreateServer({ displayname: displayname || placeholder, icon }));
    closeModal()
  };

  return (
    <>
      <div id="modalTitle">Customize Your Server</div>
      <form onSubmit={handleSubmit} className="accountForm" style={{maxWidth:'420px'}}>
        <div className="hCaption center">Give your new server a personality with a name and an icon. You can always change it later.</div><br/>
        <ImagePicker
          setStateFunc={setIcon}
        />
        <label htmlFor="displayname">SERVER NAME {errors.displayname && <span>{errors.displayname}</span>}</label>
        <input
          type="text"
          name="displayname"
          placeholder={placeholder}
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value.substr(0,128))}
        />
        <div className="hCaption3">
          By creating a server, you agree to Dissscord&apos;s
          <a className="underlineHover" href="https://discord.com/guidelines" target="_blank">
            <b> Community Guidelines</b>
          </a>.
        </div>
        <br/>
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
