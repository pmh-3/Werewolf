import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory, BrowserRouter} from "react-router-dom";
import Timer from '../services/Timer';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:6006";

function Lounge({gotoHandle}){
  const history = useHistory();
  const [code, setCode] = useState("");
  const [isReady, setisReady] = useState(0);
  const [players,setPlayers] = useState([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() =>{

    socket.emit("create-room");
    //CLEAN UP THE EFFECT
    return () => socket.disconnect();
  },[])

  socket.on("code", data => {
    setCode(data);
  });

  socket.on("joined", name =>{
     setPlayers(players => [...players, name]);
  })

  const timesUp = () => {
    console.log("time up in lounge");
    gotoHandle("intro");
	}

  return (
      <>
      <div className="lounge font-spooky text-orange">
      <h1 className="text-header absolute top-0 left-3">
        Werewolf
        <p className="text-medium absolute left-3 top-21">
          Lounge
          <p> 
            Players:
            {players.map((n)=>(
            <li>{n}</li>
            ))}
          </p>
        </p>
      </h1>
        <p className="text-large absolute top-0 right-10">
        ENTER ROOM CODE <br></br> 
          <p className="text-header absolute top-201 right-10 bg-orange text-teeth rounded px-10">
          {code}
          </p>
        </p>
        <h2 className="absolute bottom-20 left-3 text-medium">
          FIRST Player to join, press start on phone to start game.
          <Timer timesUp ={timesUp}></Timer>
        </h2>
        <p className="absolute bottom-5 right-3 text-medium">
        WAITING FOR PLAYERS ...
        </p>
       <button className="absolute bottom-5 left-3 text-medium"  onClick={() => gotoHandle("intro")} >GotoIntroduction</button>
      </div>
      </>
  )
}
export default Lounge;


