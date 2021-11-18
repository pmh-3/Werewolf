import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";
import Vote from "../services/Vote";


function DDay(){
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // my target
  const [targetList, setTargetList] = useState([]);



useEffect(() => {
  socket.on("startVoting", (w,v,a) => {
    setTargetList(a);
  })
}, []);

return (
    <>
    <div className="night font-spooky text-orange">
      <h1 className="bg-orange text-teeth text-large">DAY</h1>
      <h2> Vote someone out of the village.</h2>
      <h2>You can look at TV to see who is voting for you!</h2>
        <Vote showTargets={targetList} gameState = "day" device = "PD"/>
    </div>
    </>
)
}
export default DDay;