import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../Components/Timer';

function Sunset({gotoHandle}){
  const history = useHistory();

  const timesUp = () => {
    console.log("time up in sunset");
    gotoHandle("end");
	}

    useEffect(()=>{
        //TODO: call server to retrieve who was voted out 

    },[])  


  return (
      <>
      <div className="sunset">
        <h1>
          SUNSET<br></br>
          XXX is voted OUT! <br></br>
          IF GAME DIDN'T END, LOOP BACK TO NIGHT PAGE <br></br>
          OTHERWISE GO TO END <br></br>
          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
        
        <button  onClick={() => gotoHandle("end")} >GotoEnd</button>
       
      </div>
      </>
  )
}
export default Sunset;