import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import {
  roomIdState,
  playerRoleState,
  playerNameState,
} from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import wolfImage from "../assets/images/roles/werewolf.png";
import seerImage from "../assets/images/roles/seer.png";

function DRole({ gotoHandle, Gcode }) {
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  // const [roomId, setRoomId] = useRecoilState(roomIdState);
  // my role
  const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
  // my name
  // const [name, setName] = useRecoilState(playerNameState);
  // my instruction
  const [instruction, setInstruction] = useState();
  // my image
  const [image, setImage] = useState();

  useEffect(() => {
    socket.on("assignedRole", ({ role }) => {
      console.log("assigning role: " + role);
      setPlayerRole(role);
    });

    if (playerRole !== undefined) {
      // Different role will get different instruction
      switch (
        playerRole // TODO: change TEST_ROLE to playerRole
      ) {
        case "wolf":
          setInstruction(
            `You must remain undetected while you eliminate villagers during the night.\n` +
              `All wolves have to pick the SAME person before time is up for the vote to be valid!`
          );
          setImage(wolfImage);
          break;
        case "healer":
          setInstruction(
            `You can save one person during the night.\n` +
              `Be careful, you might be saving a wolf!! You may save yourself.`
          );
          setImage(healerImage);
          break;
        case "seer":
          setInstruction(
            `You have a secret power! You can choose one person to reveal his/her identity.\n` +
              `Be careful revealing your identity during the day! If you share your knowledge too obviously, you might become the wolves' next target!`
          );
          setImage(seerImage);
          break;
        case "villager":
          setInstruction(
            `The village's destiny depends on you and your fellow villagers! You must work together to vote out all the wolves during the day before they kill you all.`
          );
          setImage(villagerImage);
          break;
        default:
          break;
      }
    }
  }, [playerRole, setPlayerRole, socket]); // TODO: Add "assignedRole" in the [] bracke

  // // Get assignedRole from server (assignedRole will be undefined initially)
  //   socket.emit('getRole', name, roomId, (response) => {
  //     let assignedRole = response.role;
  //     console.log("assigning role: " + assignedRole);
  //     console.log("role: " + role);

  //       setPlayerRole(assignedRole);
  //       console.log("role2: " + role);
  //   });

  // TODO: change TEST_ROLE to playerRole
  return (
    <div>
      <h1>ROLE</h1>
      <h2>You are a {playerRole}</h2>
      <img src={image} width="50" height="50" alt={playerRole} />
      <h2>{instruction}</h2>
    </div>
  );
}
export default DRole;