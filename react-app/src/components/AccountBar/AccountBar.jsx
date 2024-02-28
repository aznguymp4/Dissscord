import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";

import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import AccountConfigModal from "../AccountConfigModal"
import "./AccountBar.css";

function AccountBar({ fullSize }) {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { closeModal } = useModal()
  const sessionUser = useSelector(state => state.session.user);

  return <div id="accountBar" className={fullSize?'fullSize':''}>
    <div id="accountBarIcon">
      <img src={sessionUser?.icon}/>
      <div id="accountBarIconStatus"></div>
    </div>
    <div id="accountBarNames">
      <div id="accountBarNameDisplay">{sessionUser?.displayname || sessionUser?.username}</div>
      <div id="accountBarNameUser">@{sessionUser?.username}</div>
    </div>
    <OpenModalMenuItem
      className="iconBtn"
      itemText={<img src="/icons/settings.svg"/>}
      modalComponent={<AccountConfigModal/>}
    />
    <OpenModalMenuItem
      className="iconBtn"
      itemText={<img id="accountBarLogout" src="/icons/logout.svg"/>}
      modalComponent={<>
        <div id="modalTitle">Log Out</div>
        <form onSubmit={e=>{e.preventDefault(); dispatch(thunkLogout()); closeModal()}} className="accountForm">
          <div style={{fontWeight:200,textAlign:'center'}}>Are you sure you want to log out?</div>
          <br/>
          <div id="modalFooter">
            <div className="btnText" onClick={closeModal}>Cancel</div>
            <input type="submit" className='btnRed' value='Log Out'/>
            <div id="modalFooterBg"/>
          </div>
        </form>
      </>}
    />
  </div>
}

export default AccountBar;
