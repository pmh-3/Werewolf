import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
import Vote from "../services/Vote";


function DDay({gotoHandle}){
// SocketContext
const socket = useContext(SocketContext);
// my room id
const [roomId, setRoomId] = useRecoilState(roomIdState);
// players in the current room
const [players, setPlayers] = useRecoilState(playersState);
// my target
const [targetList, setTargetList] = useState([]);
// Initialize voteComplete
const [voteSubmitted, setVoteSubmitted] = useRecoilState(voteSubmittedState);


useEffect(() => {
  socket.emit("dayBegins", roomId);
  socket.on("startVoting", (allPlayers, allWolves, allVillagers) => {
    setTargetList(allPlayers);
  });
}, [roomId, socket]);

return (
    <>
    <div className="night font-spooky text-orange">
      <h1>DAY</h1>
      <h2>Now vote someone out of the village.</h2>
      <h2>You can look at TV to see who is voting you! You can change your vote before hitting submit.</h2>
      <h1>WHO DO YOU WANT TO VOTE ??</h1>
        <Vote showTargets={targetList} gameState = "day"/>
    </div>
    </>
)
}
export default DDay;