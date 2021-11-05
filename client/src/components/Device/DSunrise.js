import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function DSunrise({gotoHandle}){
  const history = useHistory();

    useEffect(()=>{
    //TODO: call server to retrieve who was killed

    },[])

  
  const timesUp = () => {
    console.log("time up in sunrise");
    gotoHandle("day");
}


  return (
      <>
      <div className="sunrise">
        <h1>
          DEVICE SUNRISE PAGE<br></br>
          
          (NOT SURE WHAT TO SHOW HERE)
          <br></br>

          <Timer timesUp ={timesUp}></Timer>
          </h1>
        
          <button  onClick={() => gotoHandle("day")} >GoToDayButton</button>
       
      </div>
      </>
  )
}
export default DSunrise;