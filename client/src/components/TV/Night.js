import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function Night({gotoHandle}){
  const history = useHistory();

  const timesUp = () => {
    console.log("time up in night");
    gotoHandle("sunrise");
	}

  return (
      <>
      <div className="night text-orange font-spooky">
        <h1 className="text-center text-header">
          NIGHT HAS FALLEN
          <br></br>
          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
    
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("sunrise")} >GotoSunrise</button>
       
      </div>
      </>
  )
}
export default Night;