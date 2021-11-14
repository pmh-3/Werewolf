import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import wolfImage from "../assets/images/roles/werewolf.png";
import seerImage from "../assets/images/roles/seer.png";

function DEnd(){
  // SocketContext
  const socket = useContext(SocketContext);
  // winner
  const [winner, setWinner] = useState();
   // my image 
   const [image, setImage] = useState();

  // ** TEST** 
  const TEST_WINNER = "Villagers";  // TO change TEST_WINNER 

  return (
      <>
      <div className="end">
        <h1>END</h1>
        <h1>{TEST_WINNER} WON!</h1>
         
      </div>
      </>
  )
}
export default DEnd;