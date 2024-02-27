import { useEffect, useState } from "react";
import { callFetchServers } from "../../redux/server";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import "./Discovery.css";
import AccountBar from "../AccountBar/AccountBar";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ServerInfo from "./ServerInfo";
import Footer from "../Footer/Footer";

function Discovery() {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [query, setQuery] = useState('')
  const sessionUser = useSelector((state) => state.session.user);
  const servers = useSelector(state => state.server)

  useEffect(()=>{
    dispatch(callFetchServers())
  },[dispatch])

  const isAuthStr = sessionUser?' auth':''

  return (
    <>
      {sessionUser && <AccountBar fullSize={true}/>}
      <div id="discoveryHeader" className={isAuthStr}>
        <div id="discoveryContent">
          <div id="discoveryTitle">
            {sessionUser? <>
              <div>Find your community on Dissscord</div>
              <p>From gaming, to music, to learning, there's a place for you.</p>
            </> : <div>Welcome to Dissscord</div>}
          </div>
          <div id="discoveryButtons">
            {sessionUser?
            <input onChange={(e) => setQuery(e.target.value.substr(0,128).toLowerCase())} id="discoverySearch" type="text" placeholder="Explore communities"/>
            : <>
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
            </>}
          </div>
        </div>
      </div>
      {(()=>{
        let serversToShow = Object.values(servers)
        if(query) {
          serversToShow = serversToShow
            .filter(s =>
                s.displayname.toLowerCase().includes(query) // Display Name includes query
              ||s.desc.toLowerCase().includes(query) // Description includes query
              ||s.displayname.split(' ').some(w => stringSimilar(w, query) > .6) // At least one word in Display Name is 60% close to the query
              ||s.desc.split(' ').some(w => stringSimilar(w, query) > .65) // At least one word in Description is 65% close to the query
              ||query.split('').filter(l=>/\w/.test(l)).every(l => s.displayname.toLowerCase().includes(l))) // Display Name contains each letter of query
            .sort((a,b) => stringSimilar(b.displayname, query) - stringSimilar(a.displayname, query)) // Sort results (most similar to least similar by query)
            .sort((a,b) => b.displayname.toLowerCase().startsWith(query) - a.displayname.toLowerCase().startsWith(query)) // Results starting with query are prioritized
        }

        return serversToShow.length? <div className={`serverGrid${isAuthStr}`}>
          {serversToShow.map(s => s.public && <div
            className="serverTile"
            onClick={() => {
              setModalContent(<ServerInfo server={s}/>)
            }}
            key={s.id}
          >
            <img className="serverTileBanner" src={s.banner} alt=""/>
            <img className="serverTileIcon" src={s.icon} alt=""/>
            <div className="serverTileInfo">
              <div className="serverTileName">{s.displayname}</div>
              <div className="serverTileDesc">{s.desc}</div>
            </div>
          </div>)}
        </div> : <div className="serverGridBlank">
          <img src="/emptyServers.svg"/>
          <h2 style={{fontWeight:400}}>{`No ${query? 'results' : 'servers'} found`}</h2>
          <h4 className="hCaption">{query? `Try searching for something else.` : 'Why not make one instead?'}</h4>
        </div>
      })()}
      <Footer />
    </>
  );
}

export default Discovery;

function stringSimilar(s1, s2) { // float from 0 to 1 indicating how similar two strings are
	let [longer,shorter] = [s1.toLowerCase(),s2.toLowerCase()]
	if (s1.length < s2.length) {
		longer = s2
		shorter = s1
	}
	let longerLength = longer.length;
	if (longerLength == 0) return 1

	let costs = new Array()
	for (let i=0;i<=s1.length;i++) {
		let lastVal = i
		for (let j=0;j<=s2.length;j++) {
			if(!i) costs[j] = j
			else {
				if(j) {
					let newVal = costs[j - 1]
					if(s1.charAt(i-1)!=s2.charAt(j-1)) newVal = Math.min(Math.min(newVal, lastVal), costs[j])+1
					costs[j - 1] = lastVal
					lastVal = newVal
				}
			}
		}
		if (i) costs[s2.length] = lastVal
	}
	return (longerLength - costs[s2.length]) / parseFloat(longerLength)
}
