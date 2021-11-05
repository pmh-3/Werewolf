import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";

function DDay({gotoHandle}){
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
      <div>
        <h1>
        DEVICE DAY: VOTING PAGE
        <br></br>
        Pick someone! 
        
        {players.map((n)=>(
          <li>{n}</li>
        ))}
        <Timer timesUp ={timesUp}></Timer>
        </h1> 
       
        <button  onClick={() => gotoHandle("sunset")} >goToSunsetButton</button>
       
      </div>
      </>
  )
}
export default DDay;