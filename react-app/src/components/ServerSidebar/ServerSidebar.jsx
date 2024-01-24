import { useEffect } from "react";
import { callFetchMyServers } from "../../redux/server";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import "./ServerSidebar.css";

function ServerSidebar() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const myServers = useSelector(state => state.myServer)
  const { serverId } = useParams()
  const isHomeStr = location.pathname=='/'?' selected':''

  useEffect(()=>{
    dispatch(callFetchMyServers())
  },[dispatch])

  return (
    <>
      {
        myServers && <div
          id="serverBar"
          className={sessionUser?'auth':''}
          >
          <Link className="serverBarDiv" to='/'>
            <img className={`serverBarIcon${isHomeStr}`} src="/icons/serverSidebar/home.png" alt=""/>
            <div className="serverBarBalloon">
              <div className="serverBarName">Home</div>
              <div className="serverBarBalloonArrow"></div>
            </div>
            <div className={`serverBarIconLamp${isHomeStr}`}></div>
          </Link>
          <div className="serverBarHr"></div>
          {
            Object.values(myServers).map(s =>
              {
                const selStr = s.id==serverId?' selected':''
                return s.public && <Link
                  className="serverBarDiv"
                  to={`/server/${s.id}`}
                  key={s.id}
                >
                  <img className={`serverBarIcon${selStr}`} src={s.icon} alt=""/>
                  <div className="serverBarBalloon">
                    <div className="serverBarName">{s.displayname}</div>
                    <div className="serverBarBalloonArrow"></div>
                  </div>
                  <div className={`serverBarIconLamp${selStr}`}></div>
                </Link>
              }
            )
          }
        </div>
      }
    </>
  )
}

export default ServerSidebar;
