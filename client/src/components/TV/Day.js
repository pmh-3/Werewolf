import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';
import VoterList from '../services/VoterList.js';

function Day(){
  // SocketContext
  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // Timer duration
  const [duration, setDuration] = useState();
  const [players, setPlayers] = useRecoilState(playersState);


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
        <div className="inline-flex">

            {players.map((player) => (
              <div
                key={player.socketId}
                className="rounded-full h-24 w-24 flex items-center justify-center bg-indigo-500 mr-4"
              >
                <div className="text-center">{player.name}</div>
              </div>
            ))}
              <h2><VoterList currentTarget = {"me"} gameState = {"day"}/></h2>
          </div>

        </h1> 
        <Timer pageDuration = {duration}></Timer>
        
        {/* <button className="text-medium absolute bottom-5 left-3" onClick={() => gotoHandle("sunset")} >goToSunset</button> */}
       
      </div>
      </>
  )
}
export default Day;