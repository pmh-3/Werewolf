import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../Components/Timer';

function DNight({gotoHandle}){
  const history = useHistory();

  const timesUp = () => {
    console.log("time up in night");
    gotoHandle("sunrise");
	}


  return (
      <>
      <div className="night">
        <h1>
          DEVICE NIGHT PAGE
          <br></br>
          (IDENTITY NAME)
          <br></br>
          WHO DO YOU WANT TO XXX (kill/heal/pick)?
          <br></br>
          (Show a list of players to be picked)

          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
        <button  onClick={() => gotoHandle("sunrise")} >GotoSunriseButton</button>
       
      </div>
      </>
  )
}
export default DNight;