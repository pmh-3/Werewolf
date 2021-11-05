import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";


function DLounge({gotoHandle}){
  const history = useHistory();
  const [code, setCode] = useState("");
  const [isReady, setisReady] = useState(0);

  const beginGame = ()=>{
      //tell server players are ready
      gotoHandle("role")
  }

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
        (players will show up here)...
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