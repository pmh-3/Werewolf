import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './Night.css';
import Timer from '../Components/Timer';

function Night({gotoHandle}){
  const history = useHistory();

  const timesUp = () => {
    console.log("time up in night");
    gotoHandle("sunrise");
	}

  return (
      <>
      <div className="night">
        <h1>
          NIGHT PAGE
          <br></br>
          All wolves have to agree on the same person before time runs out! Otherwise, no one is killed!
          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
    
        <button  onClick={() => gotoHandle("sunrise")} >GotoSunrise</button>
       
      </div>
      </>
  )
}
export default Night;