import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../Components/Timer';

function Sunrise({gotoHandle}){
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
      <div className="sunrise text-orange font-spooky">
        <h1 className="text-center text-large">
          SUNRISE<br></br>
          XXX was killed<br></br>
          XXX was Saved<br></br>
         <br></br>
          NOW it's time to discuss and vote one of you OUT!
          <Timer timesUp ={timesUp}></Timer>
          </h1>
        <button className="text-medium absolute bottom-5 left-3"onClick={() => gotoHandle("day")} >GotoDay</button>
      </div>
      </>
  )
}
export default Sunrise;