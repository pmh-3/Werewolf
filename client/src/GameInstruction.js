import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './GameInstruction.css';

function GameInstruction(){
  const history = useHistory();

  return (
      <>
      <div className="game-instruction">
        <h1>
        GameInstruction
        </h1> 
        <h2>
        There are currently 2 wolves here in town!<br></br>
        The town's destiny depends on 3 villagers!<br></br>Luckily one of you has special ability.<br></br>
        At night, the wolves will kill one of you.<br></br>
        During daytime, one of you will be voted out of the village.<br></br>
        Don't let others see your identity! Good luck!
        </h2>
  
        <button  onClick={() => history.push("/SSNight")} >GoToNight</button>
       
      </div>
      </>
  )
}
export default GameInstruction;