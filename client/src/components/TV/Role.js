import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';


function Role(){
  // SocketContext
  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // Timer duration
  const [duration, setDuration] = useState();

  const playerObjList = [];

  useEffect(() => {

    // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
        setDuration(pageTime);
    })

    socket.emit("assignPlayerRole", roomId);
  });

  // request a list of players
  socket.on("req-tv-allplayers-fullinfo", (roomId) => {
    socket.on("res-tv-allplayers-fullinfo", (response) => {
      playerObjList = response;
    })
  })

  return (
      <>
      <div className="introduction text-teeth text-center"> 
        <h1 className="text-center text-large font-read bg-ice text-teeth my-8 rounded">
        Wolves have infiltrated the town!<br></br>
        The wolves will feast once night falls.<br></br>
        The town's destiny depends on the villagers!<br></br>
        Everyone will vote to kick out someone once day breaks.<br></br>
        Don't trust anyone with your identity!<br></br> Good luck!
        </h1>

        <h2 className="text-center text-large text-ice bg-teeth font-read font-semibold rounded-full mx-20">
        Timer:
        <p className="bg-ice text-teeth">
          <Timer pageDuration = {duration}></Timer>
        </p>
        </h2>
      </div>
      </>
  )
}
export default Role;