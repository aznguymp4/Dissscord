import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { callEditServer } from "../../redux/server";
import ImagePicker from "../ImagePicker";
import "./ServerEditModal.css"
import ToggleSwitch from "../ServerFormModal/ToggleSwitch";

function ServerEditModal({ server }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [displayname, setDisplayname] = useState(server.displayname);
  const [public_, setPublic] = useState(server.public);
  const sessionUser = useSelector((state) => state.session.user);
  const [icon, setIcon] = useState(server.icon);
  const [banner, setBanner] = useState(server.banner);
  const [desc, setDesc] = useState(server.desc);
  const [errors, setErrors] = useState({});
  const usersName = sessionUser.displayname || sessionUser.username
  const placeholder = `${usersName}'${usersName.endsWith('s')?'':'s'} server`

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {}
    if(desc.length > 512) errs.desc = 'Description exceeds 512 characters'
    if(displayname.length > 128) errs.displayname = 'Server Name exceeds 128 characters'
    if(Object.keys(errs).length) return setErrors(errs)

    const body = {
      displayname,
      icon,
      desc,
      banner,
      public: public_
    }

    dispatch(callEditServer(server.id, body, (ok, res) => {
      if(ok) return closeModal()
      setErrors(errors)
    }));
  };

  return (
    <>
      <div id="modalTitle">Edit Server</div>
      <form onSubmit={handleSubmit} className="accountForm" style={{maxWidth:'420px'}}>
        <div id="modalServerImages">
          <ImagePicker
            id="modalServerEditBanner"
            setStateFunc={setBanner}
            defaultSrc={banner}
            />
          <ImagePicker
            id="modalServerEditIcon"
            setStateFunc={setIcon}
            defaultSrc={icon}
          />
        </div>
        <label htmlFor="displayname">SERVER NAME {errors.displayname && <span>{errors.displayname}</span>}</label>
        <input
          type="text"
          name="displayname"
          placeholder={placeholder}
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value.substr(0,128))}
        />
        <label htmlFor="bio">DESCRIPTION {errors.desc && <span>{errors.desc}</span>}</label>
        <textarea
          name="desc"
          value={desc}
          placeholder={`What is your server about?`}
          rows="4"
          onChange={(e) => setDesc(e.target.value.substr(0,512))}
        />
        <label>PUBLIC {errors.public && <span>{errors.public}</span>}</label>
        <ToggleSwitch
          label={'Allow anyone to join your server'}
          setState={setPublic}
          state={public_}
        />
        <br/>
        
        <div id="modalFooter">
          <div className="btnText" onClick={closeModal}>Cancel</div>
          <input type="submit" className="btnBlue" value="Save" />
          <div id="modalFooterBg"/>
        </div>
      </form>
    </>
  );
}

export default ServerEditModal;
