import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";
import healerImage from "../assets/images/roles/healer.png";
import villagerImage from "../assets/images/roles/villager.png";
import wolfImage from "../assets/images/roles/werewolf.png";
import seerImage from "../assets/images/roles/seer.png";
import Timer from '../services/Timer';


function End(){
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  // winner
  const [winner, setWinner] = useState();
  // my image 
  const [image, setImage] = useState();



  // ** TEST** 
  const TEST_WINNER = "TEST_WINNER";  // TO change TEST_WINNER 


  // useEffect(()=>{
  //   socket.on("winner", TEST_WINNER => {
  //     setWinner(TEST_WINNER);
  //   });
  // },[])

  

  const getImage = (role) => {
    switch(role) {
      case "wolf":
        setImage(wolfImage);
        break;
      case "villager":
        setImage(villagerImage);
        break;  
      case "seer":
        setImage(seerImage);
        break;
      case "healer":
        setImage(healerImage);
        break;
    }

}

return (
    <>
    <div className="end text-center text-large text-orange font-spooky">
      <h1>END</h1>
      <h1 className="text-header">
        {TEST_WINNER} WON!</h1>
      <h2 className="text-large">
        Here is everyone's identity:</h2>
        <div className="inline-flex">
            {players && players.map((player) => (
              <div className="flex-col">
                <div key={player.socketId}
                    className = "rounded-full h-24 w-52 flex items-center justify-center bg-teeth mr-4 text-medium">
                  {getImage(player.role)}
                  <div img src={image } width="50" height="50" 
                  className="text-center">{player.name}</div>
                </div>
              </div>
            ))}
          </div>
    </div>
    </>
)
}
export default End;