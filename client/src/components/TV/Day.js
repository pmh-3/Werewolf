import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";

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
      <div className="day text-orange font-spooky text-center text-large">
        <h1>
        VOTE SOMEONE OUT OF THE TOWN
        {players.map((n)=>(
          <li>{n}</li>
        ))}
        <Timer timesUp ={timesUp}></Timer>
        </h1> 
       
        <button className="text-medium absolute bottom-5 left-3" onClick={() => gotoHandle("sunset")} >goToSunset</button>
       
      </div>
      </>
  )
}
export default Day;