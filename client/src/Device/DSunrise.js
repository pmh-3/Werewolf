import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../Components/Timer';

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
          SUNRISE<br></br>
          SORRY XXX was killed<br></br>
          OR<br></br>
          NO ONE was killed<br></br>
          NOW it's time to discuss and vote one of you OUT!
          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
        
          <button  onClick={() => gotoHandle("day")} >GoToDay</button>
       
      </div>
      </>
  )
}
export default DSunrise;