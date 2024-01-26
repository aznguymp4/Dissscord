import { useEffect } from "react";
import { callFetchServers } from "../../redux/server";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";

function SearchPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const servers = useSelector(state => state.server)

  useEffect(()=>{
    dispatch(callFetchServers())
  },[dispatch])


  const isAuthStr = sessionUser?' auth':''

  return (
    <>
      <div id="discoveryHeader" className={isAuthStr}>
        <div id="discoveryContent">
          <div id="discoveryTitle">Find your community on Discord</div>
          <div>From gaming, to music, to learning, there&apos;s a place for you.</div>


          <div id="discoveryButtons">
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

export default SearchPage;
