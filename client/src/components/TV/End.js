import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';

function End(){
  // SocketContext
  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // Timer duration
  const [duration, setDuration] = useState();

  const history = useHistory();

  useEffect(() => {
   // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
      setDuration(pageTime);
    })
  });


  return (
      <>
      <div className="end text-center text-large text-orange font-spooky">
        <h1 className="text-header">
          XXXX WON!
          <p className="text-large">
          Identity reveal:
          {/* {players.map((n)=>(
          <li>{n}</li>
          ))} */}
          </p>
          </h1>
         
        
        {/* <button className="text-medium absolute bottom-5 left-3"  onClick={() => history.push("/")} >GotoMain</button>
        */}
      </div>
      </>
  )
}
export default End;