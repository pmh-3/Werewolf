import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function DNight({gotoHandle}){
  const history = useHistory();

 

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
          
          </h1>
         
        <button  onClick={() => gotoHandle("sunrise")} >GotoSunriseButton</button>
       
      </div>
      </>
  )
}
export default DNight;