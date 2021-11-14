import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState } from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import wolfImage from "../assets/images/roles/werewolf.png";
import seerImage from "../assets/images/roles/seer.png";

function DRole({gotoHandle, Gcode}) {
     // SocketContext
    const socket = useContext(SocketContext);
    // my room id
    const [roomId, setRoomId] = useRecoilState(roomIdState);
    // my role
    const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
    // my instruction 
    const [instruction, setInstruction] = useState();
    // my image 
    const [image, setImage] = useState();


    // ** TEST ***
    const TEST_ROLE = "wolf";

    useEffect(()=>{
      
      // Get assignedRole from server (assignedRole will be undefined initially) 
      socket.on("assignedRole", TEST_ROLE);    // TODO: change TEST_ROLE to "assignedRole"
      if (TEST_ROLE !== undefined) {            // TODO: change TEST_ROLE to "assignedRole"
        // As soon as "assignedRole" gets defined, we will update playerRole
        setPlayerRole(TEST_ROLE);               // TODO: change TEST_ROLE to "assignedRole"
        // Different role will get different instruction 
        switch (TEST_ROLE) {                 // TODO: change TEST_ROLE to playerRole
          case "wolf":
            setInstruction(`You must remain undetected while you eliminate villagers during the night.\n`
            + `All wolves have to pick the SAME person before time is up for the vote to be valid!`);
            setImage(wolfImage);
            break;
          case "healer":
            setInstruction(`You can save one person during the night.\n`
            + `Be careful, you might be saving a wolf!! You may save yourself.`);
            setImage(healerImage);
            break;
          case "seer":
            setInstruction(`You have a secret power! You can choose one person to reveal his/her identity.\n`
            + `Be careful revealing your identity during the day! If you share your knowledge too obviously, you might become the wolves' next target!`);
            setImage(seerImage);
            break;    
          case "villager":
            setInstruction(`The village's destiny depends on you and your fellow villagers! You must work together to vote out all the wolves during the day before they kill you all.`);
            setImage(villagerImage);
            break;  
        }
      }
    },[])   // TODO: Add "assignedRole" in the [] bracket
  

 // TODO: change TEST_ROLE to playerRole
  return (
      <>
      <div>
        <h1>
        ROLE
        </h1> 
        <h2>
        You are a {TEST_ROLE}
        </h2>
        <img src = {image} width = "50" height = "50"/>
        <h2>
        {instruction}
        </h2>
      </div>
      </>
  )
}
export default DRole;