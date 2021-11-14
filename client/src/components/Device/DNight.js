import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import wolfImage from "../assets/images/roles/werewolf.png";
import Timer from '../services/Timer';

function DNight({gotoHandle}){
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // my role
  const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
  // my target
  const [targets, setTargets] = useState([]);
  // my final target
  const [finalTarget, setFinalTarget] = useRecoilState(playerFinalTargetState);
  // Initialize voteComplete
  const [voteComplete, setVoteComplete] = useState(false);
  

  // Initialize action --> delete if can access from PlayerRecoilState 
  const [myAction, setMyAction] = useState();
  // Initialize list to show wolf list
  const [showWolveMsg, setShowWolvesMsg] = useState();

  // ** FOR TESTING *** 
  const TEST_ROLE = "wolf";   // TODO: change TEST_ROLE to playerRole


  
  useEffect(()=>{

    socket.emit("nightBegins", roomId);
    socket.on("startVoting", (allPlayers, allWolves, allVillagers) => {
      switch (TEST_ROLE) {    
        case "wolf":
          setMyAction("KILL");
          setShowWolvesMsg(`Other wolves :\n` + allWolves);
          setTargets(allVillagers);     
          break;
        case "healer":
          setMyAction("HEAL");
          setTargets(allPlayers);
          break;
        case "seer":
          setMyAction("SEE");
          setTargets(allPlayers);     // TODO: Show list except myself! 
          break;
        case "villager": 
          setMyAction("VOTE");
          setTargets(allPlayers);     // TODO: Show list except myself! 
          break;
      }
    })
  },[])

  // TODO:   If time is up and user did not click SEND, send an empty vote to server 

  // Before vote is submitted, update vote target based on user choice
  const saveTarget = (target) => {
    if (!voteComplete)
      setFinalTarget(target);
  }

  // After vote is submitted  
  const submitFinalVote = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Send vote to server for processing 
    socket.emit("sendVote", TEST_ROLE, finalTarget);
    // Set vote complete to true, update useEffect
    setVoteComplete(true);
    // After SEND, go to next page 
    gotoHandle("sunrisePage");
  };
  
  return (
      <>
      <div className="night font-spooky text-orange">
        <h1>NIGHT</h1>
        <h1>You are a: {TEST_ROLE}</h1>    
        <h2>{showWolveMsg}</h2> 
        <h1>WHO DO YOU WANT TO  {myAction} ??</h1>
        <h2>MAKE YOUR VOTE BELOW: </h2>  
          <ul className="inline-flex">    
          <li><button onClick={() => saveTarget(targets[0])} >{targets[0]}</button></li>
          <li><button onClick={() => saveTarget(targets[1])} >{targets[1]}</button></li>
          <li><button onClick={() => saveTarget(targets[2])} >{targets[2]}</button></li>
          <li><button onClick={() => saveTarget(targets[3])} >{targets[3]}</button></li>
          <li><button onClick={() => saveTarget(targets[4])} >{targets[4]}</button></li>
          </ul>
        <br></br>  
        <form onSubmit = {submitFinalVote}>
          <button> SEND! </button>
        </form>
        <h2>You picked: {finalTarget} </h2>
      </div>
      </>
  )
}
export default DNight;