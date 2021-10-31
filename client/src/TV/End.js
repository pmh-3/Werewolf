import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './End.css';
import Timer from '../Components/Timer';

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
      <div className="end">
        <h1>
          XXXX WON!<br></br>
          <br></br>
          Here is everyone's identity:
          {players.map((n)=>(
          <li>{n}</li>
          ))}
        

          <Timer timesUp ={timesUp}></Timer>
          </h1>
         
        
        <button  onClick={() => history.push("/")} >GotoMain</button>
       
      </div>
      </>
  )
}
export default End;