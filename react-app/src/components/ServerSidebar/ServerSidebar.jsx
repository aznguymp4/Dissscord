import { useEffect } from "react";
import { callFetchMyServers } from "../../redux/server";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import "./ServerSidebar.css";
import OpenModalMenuItem from "../Discovery/OpenModalMenuItem";
import ServerFormModal from "../ServerFormModal/ServerFormModal";

function ServerSidebar() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const myServers = useSelector(state => state.myServer)
  const { serverId } = useParams()
  const isHomeStr = location.pathname == '/' ? ' selected' : ''

  useEffect(() => {
    dispatch(callFetchMyServers())
  }, [dispatch, sessionUser])

  return (
    <>
      {
        myServers && <div
          id="serverBar"
          className={sessionUser ? 'auth' : ''}
        >
          <Link className="serverBarDiv" to='/'>
            <img className={`serverBarIcon${isHomeStr}`} src="/icons/serverSidebar/home.png" alt="" />
            <div className="serverBarBalloon">
              <div className="serverBarName">Home</div>
              <div className="serverBarBalloonArrow"></div>
            </div>
            <div className={`serverBarIconLamp${isHomeStr}`}></div>
          </Link>
          <div className="serverBarHr"></div>
          {
            Object.values(myServers).map(s => {
              const selStr = s.id == serverId ? ' selected' : ''
              return s.id && <Link
                className="serverBarDiv"
                to={`/server/${s.id}`}
                key={s.id}
              >
                <img className={`serverBarIcon${selStr}`} src={s.icon} alt="" />
                <div className="serverBarBalloon">
                  <div className="serverBarName">{s.displayname}</div>
                  <div className="serverBarBalloonArrow"></div>
                </div>
                <div className={`serverBarIconLamp${selStr}`}></div>
              </Link>
            }
            )
          }
          <OpenModalMenuItem
            modalComponent={<ServerFormModal/>}
            children={<div className="serverBarDiv">
              <img className="serverBarIcon" src="/icons/serverSidebar/add.png" alt="Add a Server" />
              <div className="serverBarBalloon">
                <div className="serverBarName">Add a Server</div>
                <div className="serverBarBalloonArrow"></div>
              </div>
            </div>}
          />
        </div>
      }
    </>
  )
}

export default ServerSidebar;
