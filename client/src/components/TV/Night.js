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
          <p>
              Players In the Game:
              {players.map((player) => (
                <li key={player.socketId}>{player.name}</li>
              ))}
          </p>
            <br></br>
         </h1> 
        {/*     
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("sunrise")} >GotoSunrise</button> */}

        <h2 className="text-center text-large">
          Timer: <Timer pageDuration = {duration}></Timer>
        </h2> 

      </div>
      </>
  )
}
export default Night;