import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';

function Day(){
  // SocketContext
  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // Timer duration
  const [duration, setDuration] = useState();


  useEffect(() => {
    // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
      setDuration(pageTime);
    })
  });

  return (
      <>
      <div className="day text-orange font-spooky text-center text-large">
        <h1>
        VOTE SOMEONE OUT OF THE TOWN
        {/* {players.map((n)=>(
          <li>{n}</li>
        ))} */}

        </h1> 
        <Timer pageDuration = {duration}></Timer>
        
        {/* <button className="text-medium absolute bottom-5 left-3" onClick={() => gotoHandle("sunset")} >goToSunset</button> */}
       
      </div>
      </>
  )
}
export default Day;