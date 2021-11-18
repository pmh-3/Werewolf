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
  // room id
  const [players, setPlayers] = useRecoilState(playersState);
  // Timer duration
  const [duration, setDuration] = useState();

  //eaten
  const [eaten, setEaten] = useState('not a soul');

  //saved
  const [saved, setSaved] = useState('not a soul');


  useEffect(() => {
    // Receive timer duration from server 
    socket.on("startTimer", pageTime => {
      setDuration(pageTime);
    })

    //player name is sent
    socket.on('eaten', e => {
      setEaten(e);
    })

    socket.on('saved', s => {
      setSaved(s);
    })

  });  


  return (
      <>
      <div className="sunrise text-orange font-spooky">
        <h1 className="text-center text-large">
          SUNRISE<br></br>
          {eaten} was eaten<br></br>
          {saved} was Saved<br></br>
          Remaining players
         <br></br>
          NOW it's time to discuss and vote one of you OUT!
          <Timer pageDuration = {duration}></Timer>
          </h1>
        {/* <button className="text-medium absolute bottom-5 left-3"onClick={() => gotoHandle("day")} >GotoDay</button> */}
      </div>
      </>
  )
}
export default Sunrise;