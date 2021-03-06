import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';

function Sunset(){
  // SocketContext
  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // Timer duration
  const [duration, setDuration] = useState();

  const [banished, setBanished] = useState();

  useEffect(() => {
    // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
      setDuration(pageTime);
    })

    socket.on("banished", b => {
      setBanished(b.name);
    })
  });

  return (
      <>
      <div className="sunset text-large text-center text-orange font-spooky">
        <h1 className="bg-ice text-teeth text-large">
          SUNSET<br></br>
        </h1>
        <h2 className=" font-read text-medium font-semibold bg-teeth text-ice">
          {banished} has been voted OUT! <br></br>
          {/* IF GAME DIDN'T END, LOOP BACK TO NIGHT PAGE <br></br>
          OTHERWISE GO TO END  */}<br></br>
        </h2>
        <p className="mt-14 text-large font-read font-semibold">
        <Timer pageDuration = {duration}></Timer>
        </p>
        {/* <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("end")} >GotoEnd</button> */}
       
      </div>
      </>
  )
}
export default Sunset;