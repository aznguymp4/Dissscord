import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { callCreateServer } from "../../redux/server";
import ImagePicker from "../ImagePicker";
import ToggleSwitch from "./ToggleSwitch";

function ServerFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [displayname, setDisplayname] = useState("");
  const [desc, setDesc] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const [icon, setIcon] = useState('');
  const [public_, setPublic] = useState(false)
  const [errors, setErrors] = useState({});
  const usersName = sessionUser.displayname || sessionUser.username
  const placeholder = `${usersName}'${usersName.endsWith('s')?'':'s'} server`

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(displayname.length>128) return setErrors({displayname: 'Name exceeds 128 characters'})
    dispatch(callCreateServer({ displayname: displayname || placeholder, icon, public: public_, desc }));
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
        <label htmlFor="desc">DESCRIPTION {errors.desc && <span>{errors.desc}</span>}</label>
        <textarea
          name="desc"
          value={desc}
          placeholder={`What is your server about? (optional)`}
          rows="4"
          onChange={(e) => setDesc(e.target.value.substr(0,512))}
        />
        <label>PUBLIC {errors.public && <span>{errors.public}</span>}</label>
        <ToggleSwitch
          label={'Allow anyone to join your server'}
          setState={setPublic}
          state={public_}
        />
        <div className="hCaption3" style={{marginBottom:'10px'}}>
          <br/>
          By creating a server, you agree to Dissscord&apos;s
          <a className="underlineHover" href="https://discord.com/guidelines" target="_blank">
            <b> Community Guidelines</b>
          </a>.
        </div>
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
