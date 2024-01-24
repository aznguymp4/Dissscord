import { useEffect } from "react";
import { callFetchServers } from "../../redux/server";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import "./Discovery.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Discovery() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const servers = useSelector(state => state.server)

  useEffect(()=>{
    dispatch(callFetchServers())
  },[dispatch])

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  const isAuthStr = sessionUser?' auth':''

  return (
    <>
      <div id="discoveryHeader" className={isAuthStr}>
        <div id="discoveryContent">
          <div id="discoveryTitle">Welcome to Dissscord</div>
          <div id="discoveryButtons">
            {sessionUser?
              <>
                <div id="btnLogout" className="btn" onClick={logout}>Log Out</div>
              </>
              :
              <>
                <OpenModalMenuItem
                  id="btnSignup"
                  className="btn"
                  itemText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
                <OpenModalMenuItem
                  id="btnLogin"
                  className="btn"
                  itemText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </>
            }
          </div>
        </div>
      </div>
      {
        servers && <div className={`serverGrid${isAuthStr}`}>
          {
            Object.values(servers).map(s => s.public && <div className="serverTile" key={s.id}>
              <img className="serverTileBanner" src={s.banner} alt=""/>
              <img className="serverTileIcon" src={s.icon} alt=""/>
              <div className="serverTileInfo">
                <div className="serverTileName">{s.displayname}</div>
                <div className="serverTileDesc">{s.desc}</div>
              </div>
            </div>)
          }
        </div>
      }
    </>
  );
}

export default Discovery;
