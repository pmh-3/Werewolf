import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './Introduction.css';
import Timer from '../Components/Timer';

function Introduction({gotoHandle}){

  const history = useHistory();

  const timesUp = () => {
    console.log("time up in intro");
    gotoHandle("night");
	}

  useEffect(() =>{
    // TODO: Call server to get how many wolves, how many villagers 

  },[])

  return (
      <>
      <div className="introduction">
        <h1>
        Introduction
        </h1> 
        <h1>
        There are currently XXX wolves here in town!<br></br>
        The town's destiny depends on XXX villagers!<br></br>
        The wolves can kill at night.<br></br>
        Everyone will vote during the day.<br></br>
        Don't let others see your identity!<br></br> Good luck!
        <Timer timesUp ={timesUp}></Timer>
        </h1>

        
        
        <button  onClick={() => history.push("/SSNight")} >GoToNight</button>
       
      </div>
      </>
  )
}
export default Introduction;