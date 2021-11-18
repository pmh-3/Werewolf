import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";
import Vote from "../services/Vote";

function DNight(){
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
  // wolve list
  const [wolfList, setWolvesList] = useState([]);
  // villager list 
  const [villagerList, setVillagerList] = useState([]);

  

  // Initialize action --> delete if can access from PlayerRecoilState 
  const [myAction, setMyAction] = useState();
  // Initialize list to show wolf list
  const [showWolveMsg, setShowWolvesMsg] = useState();

  useEffect(() => {
    socket.on("startVoting", (w,v,a) => {

      switch (role) {
        case "wolf":
          setMyAction("KILL");

          //TODO: send list of wolves and villagers players from server
  
          // Process Players list and get all wolves and all villagers 
          //  ==> COULDN'T GET THIS TO WORK
          // for (let p of Players.all) {
          //   if (p.role == 'wolf') {
          //     console.log("p.role" + p.role);
          //     const updatedList = [...wolvesList, p.name]
          //     console.log("Step 1: wolveList: " + updatedList);
          //     setWolvesList(updatedList);
              
          //   }
          //   if (p.role == 'villager') {
          //     console.log("p.role" + p.role);
          //     const updatedList = [...villagerList, p];
          //     console.log("Step 2: villagerlist: " + updatedList);
          //     setVillagerList(updatedList);
          //   }
          // };
          // console.log("wolveList: " + wolvesList);
          // console.log("village list:" + villagerList);
  
          setShowWolvesMsg(`Other wolves :\n` + w);
          setTargetList(a);
          break;
        case "healer":
          setMyAction("HEAL");
          setTargetList(a);
          break;
        case "seer":
          setMyAction("SEE");
          setTargetList(a); // TODO: Show list except myself!
          break;
        case "villager":
          setMyAction("VOTE");
          setTargetList(a); // TODO: Show list except myself!
          break;
        default:
          break;
      }
    });

  }, []);

  

  return (
      <>
      <div className="night font-spooky text-center text-medium">
        <h1 className="text-large bg-ice text-teeth"
        >
        NIGHT
        </h1>
        <h1 className="bg-teeth text-ice"
        >
        You are a {role}
        </h1>    
        <h2>{showWolveMsg}</h2> 
        <h1>WHO DO YOU WANT TO  {myAction}</h1>
        <div className="flex items-center justify-center">
          <Vote showTargets={targetList}
          className="font-read" gameState = "night" device = "PD"/> 
        </div> 
        
      </div>
      </>
  )
}
export default DNight;