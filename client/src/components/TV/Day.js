import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
import Vote from "../services/Vote";
import Timer from '../services/Timer';


function Day(){
  
    // SocketContext
    const socket = useContext(SocketContext);
    // target list 
    const [targetList, setTargetList] = useState([]);
    // Timer duration
    const [duration, setDuration] = useState();

    

  useEffect(() => {
    // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
      setDuration(pageTime);
    })

    socket.on("startVoting", (wolfList, villagerList, playerList) => {
      setTargetList(playerList);
    });

  });

  return (
      <>
      <div className="day text-orange font-spooky text-center text-large">
      <h1 className="bg-orange text-teeth text-large">VOTE SOMEONE OUT OF THE TOWN</h1>
        <div>
        <Vote showTargets={targetList} gameState = "day" device = "TV"/>
        </div>
        <p className="mt-14 text-large font-read font-semibold">
        <Timer pageDuration = {duration}></Timer>
        </p>
        
        {/* <button className="text-medium absolute bottom-5 left-3" onClick={() => gotoHandle("sunset")} >goToSunset</button> */}
       
      </div>
      </>
  )
}
export default Day;