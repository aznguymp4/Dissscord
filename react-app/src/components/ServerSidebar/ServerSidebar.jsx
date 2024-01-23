import { useEffect } from "react";
import { callFetchMyServers } from "../../redux/server";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import "./ServerSidebar.css";

function ServerSidebar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const myServers = useSelector(state => state.myServer)

  useEffect(()=>{
    dispatch(callFetchMyServers())
  },[dispatch])

  return (
    <>
      {
        sessionUser && myServers && <div id="serverBar">
          {
            Object.values(myServers).map(s => s.public && <div className="serverBarDiv" key={s.id}>
              <img className="serverBarIcon" src={s.icon} alt=""/>
              <div className="serverBarBalloon">
                <div className="serverBarName">{s.displayname}</div>
                <div className="serverBarBalloonArrow"></div>
              </div>
            </div>)
          }
        </div>
      }
    </>
  );
}

export default ServerSidebar;
