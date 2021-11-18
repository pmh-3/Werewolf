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
    switch (playerRole) {    
      case "wolf":
        if (finalTarget == undefined)
          setActionSummary(`Unfortunately, you didn't pick the same person before time ran out.`);
        else 
          setActionSummary(`YOU ALL CHOSE TO KILL: ` + ` ${finalTarget}`);
        break;
      case "healer":
        setActionSummary(`YOU CHOSE TO SAVE: ` + `${finalTarget}`);
        break;
      case "seer":
        if (identity == undefined)
          setActionSummary(`Retrieving identity...`);
        else
          setActionSummary(`${finalTarget}`+ "'S IDENTITY is " + `${identity}`);
        break;
      case "villager":
        setActionSummary(`YOU THINK ` + `${finalTarget}` + ` IS A WOLF`);
        break;
    }
  },[identity])

  // Get identity from server, rID may be undefined initially 
  socket.on("revealIdentity", rID => {
    setIdentity(rID);
  });

  return (
      <>
      <div className="sunrise">
        <h1>SUNRISE</h1>
        <h1>You are a: {playerRole}</h1>
        <h2>{actionSummary}</h2>
        <h2>Waiting for other's votes...</h2>  
       
      </div>
      </>
  )
}
export default DSunrise;