import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './SSDay.css';

function SSDay(){
  const history = useHistory();
  const [players,setPlayers] = useState([]);

  useEffect(()=>{
    //call server to retrieve remaining players
    setPlayers(['Zi','Jason','Nirmalya','Charlie', 'Peter']);

  },[])

  return (
      <>
      <div className="ss-day">
        <h1>
        What happened last night
        </h1> 
        <h1>
          {players.map((n)=>(
            <li>{n}</li>
          ))}
        </h1>
        <h3>
        Now discuss and vote on whom you think should be kicked out of town!
        </h3>
      

        <button  onClick={() => history.push("/")} >GoToMain</button>
       
      </div>
      </>
  )
}
export default SSDay;