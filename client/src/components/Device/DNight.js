import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
import Vote from "../services/Vote";

function DNight({gotoHandle}){
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // my role
  const [role, setPlayerRole] = useRecoilState(playerRoleState);
  // my target
  const [targetList, setTargetList] = useState([]);
  // Initialize voteComplete
  const [voteSubmitted, setVoteSubmitted] = useRecoilState(voteSubmittedState);
  

  // Initialize action --> delete if can access from PlayerRecoilState 
  const [myAction, setMyAction] = useState();
  // Initialize list to show wolf list
  const [showWolveMsg, setShowWolvesMsg] = useState();


  useEffect(() => {
    //socket.emit("nightBegins", roomId);
    // If vote is submitted, go to next page
    if (voteSubmitted === true) gotoHandle("sunrisePage");
  }, [gotoHandle, voteSubmitted]);

  socket.on("startVoting", (Players) => {
    switch (role) {
      case "wolf":
        setMyAction("KILL");
        setShowWolvesMsg(`Other wolves :\n` + Players.wolves);
        setTargetList(Players.villagers);
        console.log(Players.wolves);
        break;
      case "healer":
        setMyAction("HEAL");
        setTargetList(Players.all);
        break;
      case "seer":
        setMyAction("SEE");
        setTargetList(Players.all); // TODO: Show list except myself!
        break;
      case "villager":
        setMyAction("VOTE");
        setTargetList(Players.all); // TODO: Show list except myself!
        break;
      default:
        break;
    }
  });

  return (
      <>
      <div className="night font-spooky text-orange">
        <h1>NIGHT</h1>
        <h1>You are a: {role}</h1>    
        <h2>{showWolveMsg}</h2> 
        <h1>WHO DO YOU WANT TO  {myAction} ??</h1>
        <Vote showTargets={targetList} gameState = "night"/>  
        
      </div>
      </>
  )
}
export default DNight;