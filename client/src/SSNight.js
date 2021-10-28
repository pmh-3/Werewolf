import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './SSNight.css';

function SSNight(){
  const history = useHistory();


  return (
      <>
      <div className="ss-night">
        <h2>
        Werewolf, vote a player to kill!
        </h2> 
      
       
        <button  onClick={() => history.push("/SSDay")} >GotoDay</button>

        <h2>
        All wolves must agree and vote the SAME person! 
        </h2>

        
      </div>
      </>
  )
}
export default SSNight;