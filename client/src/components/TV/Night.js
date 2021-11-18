import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';
import QuestionMark from '../assets/images/roles/questionMark.png';


function Night(){
  // SocketContext
  const socket = useContext(SocketContext);
  // Timer duration
  const [duration, setDuration] = useState();
  // Jason: use current room players(recoil state - should be the same from lounge)
  const [players, setPlayers] = useRecoilState(playersState);

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
          <div className="inline-flex">
            {players.map((player) => (
              <div key={player.socketId}
                   className = "rounded-full h-24 w-52 flex items-center justify-center bg-teeth mr-4 text-medium"
              >
                  <div className="text-center">{player.name}</div>
                  <img src={QuestionMark} width="50" height="50"/>
              </div>
            ))}
          </div>
         </h1> 
        {/*     
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("sunrise")} >GotoSunrise</button> */}

        <h2 className="text-center text-large font-read font-semibold">
        Timer: <Timer pageDuration = {duration}></Timer>
        </h2> 

      </div>
      </>
  )
}
export default Night;