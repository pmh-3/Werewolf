import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './SSNight.css';
import Timer from './Components/Timer';

function SSNight(){
  const history = useHistory();

  const timesUp = () => {
    history.push("/SSDay");
	}


  return (
      <>
      <div className="ss-night">
        <h2>
        Who will the werewolf kill tonight?
        </h2> 
        
        <button  onClick={() => history.push("/SSDay")} >GotoDay</button>
        <h2>
        All wolves must agree and vote the SAME person! 
        <Timer timesUp ={timesUp}></Timer>
        </h2>
      </div>
      </>
  )
}
export default SSNight;