import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
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
      <div className="introduction text-orange font-spooky"> 
        <h1 className="text-center text-large">
        Wolves have infiltrated the town!<br></br>
        The wolves will kill once night falls.<br></br>
        The town's destiny depends on the villagers!<br></br>
        Everyone will vote to kick out someone once day breaks.<br></br>
        Don't trust anyone with your identity!<br></br> Good luck!
        <Timer timesUp ={timesUp}></Timer>
        </h1>   
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("night")} >GoToNight</button>
      </div>
      </>
  )
}
export default Introduction;