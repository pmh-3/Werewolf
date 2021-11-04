import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './Day.css';
import Timer from "../Components/Timer";

function Day({gotoHandle}){
  const history = useHistory();
  const [players,setPlayers] = useState([]);

  const timesUp = () => {
    console.log("time up in day");
    gotoHandle("sunset");
	}


  useEffect(()=>{
    //TODO: call server to retrieve remaining players
    setPlayers(['XXX','XXX','XXX','XXX', 'XXX']);

  },[])

  return (
      <>
      <div className="day">
        <h1>
        VOTING PAGE
        
        {players.map((n)=>(
          <li>{n}</li>
        ))}
        <Timer timesUp ={timesUp}></Timer>
        </h1> 
       
        <button  onClick={() => gotoHandle("sunset")} >goToSunset</button>
       
      </div>
      </>
  )
}
export default Day;