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
    <div className="night font-spooky text-orange text-small text-center">
      <h1 className="bg-orange text-teeth text-large text-center">DAY</h1>
      <h2 className="bg-teeth text-orange font-read font-semibold text-center"> 
      Vote someone out of the village. <br></br>
      You can look at TV to see who is voting for you!</h2>
      <div className="flex items-center justify-center text-medium">
          <Vote showTargets={targetList}
          className="font-read" gameState = "day" device = "PD"/> 
      </div> 
    </div>
    </>
)
}
export default DDay;