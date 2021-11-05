import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory, BrowserRouter} from "react-router-dom";
import Timer from '../Components/Timer';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:6006";

function Lounge({gotoHandle}){
  const history = useHistory();
  const [code, setCode] = useState("");
  const [isReady, setisReady] = useState(0);
  const [players,setPlayers] = useState([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() =>{

    socket.send("createRoom", data => {
      createRoom(data);
    });
    //CLEAN UP THE EFFECT
    return () => socket.disconnect();
  },[])

  socket.on("code", data => {
    createRoom(data);
  });

  const createRoom = (code)=>{

    setCode(code);
    // TODO: Call Server to create a room and return a code
    // TODO: Call Server to get player's names (and possibly unique ID?) 
    setPlayers(['XXX','XXX','XXX','XXX', 'XXX']);
    
    return code;
  }

  const addPlayers = ()=>{

  }

  const timesUp = () => {
    console.log("time up in lounge");
    gotoHandle("intro");
	}

  return (
      <>
      <div className="lounge">
        <h1>
        Werewolf<br></br>
        Lounge
        </h1> 
        <h1>
        Enter ROOM CODE:<br></br> {code}
        </h1>
        <h2>
        Players joined: 
        {players.map((n)=>(
          <li>{n}</li>
        ))}
        </h2>
        <h2>
          FIRST Player to join, press start on phone to start game.
          <Timer timesUp ={timesUp}></Timer>
        </h2>
        <h3>
        WAITING FOR PLAYERS ...
        </h3>

       <button  onClick={() => gotoHandle("intro")} >GotoIntroduction</button>

       
      </div>
      </>
  )
}
export default Lounge;


