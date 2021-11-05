import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from '../services/Timer';

function End({gotoHandle}){
  const history = useHistory();
  const [players,setPlayers] = useState([]);

  const timesUp = () => {
    console.log("time up in end")
    history.push("/");
    }

    useEffect(()=>{
        //call server to see who won
        // call server to reveal everyone's identity 
        setPlayers(['XXX','XXX','XXX','XXX', 'XXX']);

    },[])  


  return (
      <>
      <div className="end text-center text-large text-orange font-spooky">
        <h1 className="text-header">
          XXXX WON!
          <p className="text-large">
          Identity reveal:
          {players.map((n)=>(
          <li>{n}</li>
          ))}
          <Timer timesUp ={timesUp}></Timer>
          </p>
          </h1>
         
        
        <button className="text-medium absolute bottom-5 left-3"  onClick={() => history.push("/")} >GotoMain</button>
       
      </div>
      </>
  )
}
export default End;