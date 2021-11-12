import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";


function DRole({gotoHandle, Gcode}) {
    const history = useHistory();
    const [code, setCode] = useState(Gcode);
    const [role, setRole] = useState('werewolf');
    const [instructions, setIns] = useState('You must remain undetected while you eliminate villagers during the night.')
    const [timeLeft, setTime] = useState(0);

  
  return (
      <>
      <div>
        <h1>
        ROLE
        </h1> 
        <h2>
        You are a {role}
        </h2>
        <h2>
        {instructions}
        </h2>
      </div>
      </>
  )
}
export default DRole;