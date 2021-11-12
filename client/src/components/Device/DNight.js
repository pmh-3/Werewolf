import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState } from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import werewolfImage from "../assets/images/roles/werewolf.png";
import Timer from '../services/Timer';

function DNight({gotoHandle}){
  // SocketContext
  const socket = useContext(SocketContext);
  // current room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // Set voting targets 
  const [targets, setTargets] = useState([]);
  // Initialize finalVote
  const [finalTarget, setFinalTarget] = useState();
  // Initialize voteComplete
  const [voteComplete, setVoteComplete] = useState(false);
  // Define action summary
  const [actionSummary, setActionSummary] = useState();

  // Initialize myRole --> delete if can access from PlayerRecoilState 
  const [myRole, setMyRole] = useState();
  // Initialize action --> delete if can access from PlayerRecoilState 
  const [myAction, setMyAction] = useState();
  // Initialize list to show wolf list
  const [showWolveMsg, setShowWolvesMsg] = useState();
  
  

  // Show list except myself! 
  useEffect(()=>{

    socket.emit("nightBegins", roomId);
    socket.on("startVoting", (voterRole, allPlayers, allWolves, allVillagers) => {
      setMyRole(voterRole); // may not need to send voterRole if can access from PlayerRecoilState
      
      switch (voterRole) {
        case "wolf":
          if (!voteComplete) {
            setMyAction("KILL");
            setShowWolvesMsg(`Other wolves :\n` + allWolves);
            setTargets(allPlayers);   // for testing purpose, will change to "allVillagers"
          } else {
            setActionSummary(`YOU CHOSE TO ` + `${myAction}` + ": " + `${finalTarget}`);
          }
          break;
        case "healer":
          if (!voteComplete) {
            setMyAction("HEAL");
            setTargets(allPlayers);
          } else {
            setActionSummary(`YOU CHOSE TO ` + `${myAction}` + `: ` + `${finalTarget}`);
          }
          break;
        case "seer":
          if (!voteComplete) {
            setMyAction("SEE");
            setTargets(allPlayers);
          } else {
            // Get revealed identity from server; NOT SURE WHY NEED TO CLICK SEND TWICE FOR THIS TO SHOW
            socket.on("revealIdentity", identity => {
              console.log("Step 2")
              setActionSummary(`${finalTarget}`+ "'S IDENTITY is " + identity);
            });
          }
          break;
        default:
          if (!voteComplete) {
            setMyAction("VOTE");
            setTargets(allPlayers);
          } else {
            setActionSummary(`YOU VOTED FOR: ` + `${finalTarget}`);
          }
          break;
      }
    })
  },[voteComplete])


  // TODO:   If time is up and user did not click SEND, send an empty vote to server 

  // Before vote is submitted, update vote target based on user choice
  const saveTarget = (target) => {
    if (!voteComplete)
      setFinalTarget(target);
  }

  // After vote is submitted  
  const submitFinalVote = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Send vote to server 
    socket.emit("sendVote", "TESTSEER", finalTarget);
    console.log("Step 1");
    
    // Set vote complete to true, update useEffect
    setVoteComplete(true);
  };
  


  return (
      <>
      <div className="night font-spooky text-orange">
        <h1>NIGHT</h1>
        <img src = {werewolfImage} width = "50" height = "50"/>
        <h1>You are a: {myRole}</h1>
        <h2>{showWolveMsg}</h2> 
        <h1>WHO DO YOU WANT TO  {myAction} ??</h1>
        <h2>MAKE YOUR VOTE BELOW: </h2>  
          <ul className="inline-flex">    
          <li><button onClick={() => saveTarget(targets[0])} ><img src = {villagerImage} width = "50" height = "50"/>{targets[0]}</button></li>
          <li><button onClick={() => saveTarget(targets[1])} ><img src = {villagerImage} width = "50" height = "50"/>{targets[1]}</button></li>
          <li><button onClick={() => saveTarget(targets[2])} ><img src = {villagerImage} width = "50" height = "50"/>{targets[2]}</button></li>
          <li><button onClick={() => saveTarget(targets[3])} ><img src = {villagerImage} width = "50" height = "50"/>{targets[3]}</button></li>
          <li><button onClick={() => saveTarget(targets[4])} ><img src = {villagerImage} width = "50" height = "50"/>{targets[4]}</button></li>  
          </ul>
        <br></br>  
        <form onSubmit = {submitFinalVote}>
          <button> SEND! </button>
        </form>
        <br></br>  
        <h2>You picked: {finalTarget} </h2>
        <h2>{actionSummary}</h2>
        <br></br>  
        <button onClick={() => gotoHandle("sunrise")} >GotoSunriseButton</button>

      </div>
      </>
  )
}
export default DNight;