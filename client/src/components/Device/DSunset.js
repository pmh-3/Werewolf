import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function DSunset({gotoHandle}){
  const history = useHistory();

    useEffect(()=>{
        //TODO: call server to retrieve who was voted out 

    },[])  


  return (
      <>
      <div className="sunset">
        <h1>
          SUNSET<br></br>
          (IF GAME DIDN'T END, LOOP BACK TO NIGHT PAGE<br></br>
          OTHERWISE GO TO END)<br></br>
          </h1>
         
        
          <button  onClick={() => gotoHandle("end")} >GoToEndButton</button>
       
      </div>
      </>
  )
}
export default DSunset;