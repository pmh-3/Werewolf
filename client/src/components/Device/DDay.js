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
  socket.on("startVoting", (Players) => {
    setTargetList(Players.all);
  });
}, []);


return (
    <>
    <div className="night font-spooky text-orange">
      <h1>DAY</h1>
      <h2>Now vote someone out of the village.</h2>
      <h2>You can look at TV to see who is voting you! You can change your vote before hitting submit.</h2>
      <h1>WHO DO YOU WANT TO VOTE ??</h1>
        <Vote showTargets={targetList} gameState = "day" device = "PD"/>
    </div>
    </>
)
}
export default DDay;