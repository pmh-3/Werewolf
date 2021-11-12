import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';

function Sunrise({gotoHandle}){
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
      <div className="sunrise text-orange font-spooky">
        <h1 className="text-center text-large">
          SUNRISE<br></br>
          XXX was killed<br></br>
          XXX was Saved<br></br>
          here is who was left: show a list of current player 
         <br></br>
          NOW it's time to discuss and vote one of you OUT!
         
          </h1>
        {/* <button className="text-medium absolute bottom-5 left-3"onClick={() => gotoHandle("day")} >GotoDay</button> */}
      </div>
      </>
  )
}
export default Sunrise;