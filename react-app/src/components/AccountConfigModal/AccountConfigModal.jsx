import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { uploadImg } from "../../redux/csrf";
import ImagePicker from "../ImagePicker";
import "./AccountConfigModal.css";

function AccountConfigModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState(sessionUser.email);
  const [username, setUsername] = useState(sessionUser.username);
  const [displayName, setDisplayName] = useState(sessionUser.displayname);
  const [bio, setBio] = useState(sessionUser.bio);
  const [icon, setIcon] = useState(sessionUser.icon);
  const [passPage, setPassPage] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      displayname: displayName,
      bio,
      icon
    }
    console.log(body)
  };

  return <>
  <div id="modalTitle">{passPage? 'Password' : 'Account'} Settings</div>
  <form onSubmit={handleSubmit} className="accountForm" style={{maxWidth:'420px'}}>
    {passPage? <>
      <label htmlFor="curPassword">CURRENT PASSWORD {errors.password && <span>{errors.password}</span>}</label>
      <input
        type="password"
        name="curPassword"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required={passPage}
      />
      <label htmlFor="password">NEW PASSWORD {errors.password && <span>{errors.password}</span>}</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={passPage}
      />
      <label htmlFor="confirmPassword">CONFIRM PASSWORD {errors.confirmPassword && <span>{errors.confirmPassword}</span>}</label>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required={passPage}
      />
    </> : <>
      <ImagePicker
        defaultSrc={icon}
        setStateFunc={setIcon}
        delBtnShow={true}
      />
      <label htmlFor="displayname">DISPLAY NAME {errors.displayname && <span>{errors.displayname}</span>}</label>
      <input
        type="text"
        name="displayname"
        placeholder={username}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value.substr(0,128))}
      />
      <label htmlFor="username">USERNAME {errors.username && <span>{errors.username}</span>}</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value.substr(0,40))}
      />
      <label htmlFor="email">EMAIL {errors.email && <span>{errors.email}</span>}</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.substr(0,255))}
      />
      <label htmlFor="bio">BIOGRAPHY {errors.bio && <span>{errors.bio}</span>}</label>
      <textarea
        name="bio"
        value={bio}
        placeholder={`My favorite ${['food','color','animal','game','movie','programming language'][~~(Math.random()*6)]} is...`}
        rows="4"
        onChange={(e) => setBio(e.target.value.substr(0,256))}
      />
      <div className="btnText" style={{marginTop:'3px'}} onClick={()=>setPassPage(true)}><b>Change Password</b><br/><br/></div>
    </>}
    
    <div id="modalFooter">
      <div className="btnText" onClick={() => passPage? setPassPage(false) : closeModal()}>{passPage? 'Back' : 'Cancel'}</div>
      <input type="submit" className="btnBlue" value="Save" />
      <div id="modalFooterBg"/>
    </div>
  </form>
</>
}

export default AccountConfigModal;
