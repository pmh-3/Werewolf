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
      <div className="sunrise text-orange font-spooky text-medium">
        <h1 className="text-center text-header bg-orange text-teeth mb-8">
          SUNRISE<br></br>
        </h1>
        <p className="text-center bg-orange text-teeth font-read font-semibold mb-8">
        {eaten} was eaten<br></br>
        {saved} was Saved<br></br>
        </p>
        <h2 className="text-center text-teeth bg-orange font-read mb-8">
          Remaining players
         <br></br>
          NOW it's time to discuss and vote one of you OUT!
        </h2>
        <p className="text-center text-teeth text-large mx-96 rounded-full font-read">
          <Timer pageDuration = {duration}></Timer>
        </p>
      </div>
      </>
  )
}
export default Sunrise;