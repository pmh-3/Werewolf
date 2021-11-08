import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";
import io from "socket.io-client";
const socket = io('http://127.0.0.1:6006');


function DLounge({gotoHandle, Gcode}){
  const history = useHistory();
  const [code, setCode] = useState(Gcode);
  const [isReady, setisReady] = useState(0);
  const [players,setPlayers] = useState([]);

  const beginGame = ()=>{
      //tell server players are ready
      gotoHandle("role")
  }

  socket.on("joined", name =>{
    setPlayers(players => [...players, name]);
 })

  socket.emit('start', code);

  return (
      <>
      <div className="lounge">
        <h1>
        DEVICE LOUNGE PAGE 
        </h1> 
        <h1>
        First Player to join, starts the game.
        </h1>
        <br></br>
        Players:
            {players.map((n)=>(
            <li>{n}</li>
            ))}
        <br></br>
        <br></br>
        <h3>
        Waiting for players...
        </h3>

        <button  onClick={() =>beginGame() } >StartGameButton</button>

      </div>
      </>
  )
}

export default DLounge;