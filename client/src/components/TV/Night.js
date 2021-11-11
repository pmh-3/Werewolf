import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';


function Night(){
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
      <div className="night text-orange font-spooky">
        <h1 className="text-center text-header">
          NIGHT HAS FALLEN
          <br></br>
          </h1> 
        {/*     
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("sunrise")} >GotoSunrise</button> */}
       
      </div>
      </>
  )
}
export default Night;