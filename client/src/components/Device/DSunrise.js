import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function DSunrise({gotoHandle}){
  const history = useHistory();


  return (
      <>
      <div className="sunrise">
        <h1>
          SUNRISE<br></br>
          
          (NOT SURE WHAT TO SHOW HERE)
          <br></br>

          </h1>
        
          <button  onClick={() => gotoHandle("day")} >GoToDayButton</button>
       
      </div>
      </>
  )
}
export default DSunrise;