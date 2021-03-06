import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";


function DSunrise(){
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // my role
  const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
  // my final target
  const [finalTarget, setFinalTarget] = useRecoilState(playerFinalTargetState);
  // my action summary
  const [actionSummary, setActionSummary] = useState();
  // Initialize identity
  const [identity, setIdentity] = useState();
  


  // ** TEST ***
  const TEST_ROLE = "seer";   // TODO: change TEST_ROLE to playerRole 

  useEffect(()=>{

    if (finalTarget === "noVote" || finalTarget === "")
          setActionSummary(`YOU DID NOT SUBMIT A VOTE.`);
    else {
      switch (playerRole) {    
        case "wolf":
            setActionSummary(`YOU CHOSE TO EAT: ${finalTarget}`);
          break;
        case "healer":
          setActionSummary(`YOU CHOSE TO SAVE: ${finalTarget}`);
          break;
        case "seer":
          console.log("I am here" + identity);
          setActionSummary(`${finalTarget}'S IDENTITY is ${identity}`);
          break;
        case "villager":
          setActionSummary(`YOU THINK ${finalTarget} IS A WOLF. HOPE YOU ARE RIGHT!`);
          break;
          }
      }
  },[identity])

  // Get identity from server
  socket.on("revealRole", role => {
    const revealedRole = role;
    setIdentity(revealedRole);
    console.log("role: " + role);
    console.log("role >>" + revealedRole);
  });


  return (
      <>
      <div className="sunrise font-spooky text-center text-medium">
        <h1 className="bg-orange text-teeth text-large"
        >SUNRISE
        </h1>
        <h1 className="font-read font-semibold">You are a {playerRole}</h1>
        <h2 className="font-read font-semibold bg-teeth">{actionSummary}</h2>
        <h2 className="absolute bottom-5 right-3">Check TV for voting results</h2>  

      </div>
      </>
  )
}
export default DSunrise;