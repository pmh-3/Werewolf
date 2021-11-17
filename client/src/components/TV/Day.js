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

    socket.on("startVoting", (Players) => {
      setTargetList(Players.all);
    });

  });

  return (
      <>
      <div className="day text-orange font-spooky text-center text-large">
      <h1>VOTE SOMEONE OUT OF THE TOWN</h1>
        <div>
        <Vote showTargets={targetList} gameState = "day" device = "TV"/>
        </div>
        
        <Timer pageDuration = {duration}></Timer>
        
        {/* <button className="text-medium absolute bottom-5 left-3" onClick={() => gotoHandle("sunset")} >goToSunset</button> */}
       
      </div>
      </>
  )
}
export default Day;