import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function DSunset(){
  const history = useHistory();

    useEffect(()=>{
        //TODO: call server to retrieve who was voted out 

    },[])  


  return (
      <>
      <div className="sunset text-center font-spooky">
        <h1 className="bg-ice text-teeth text-large">
          SUNSET<br></br>
          </h1>
         
        
          {/* <button  onClick={() => gotoHandle("end")} >GoToEndButton</button> */}
       
      </div>
      </>
  )
}
export default DSunset;