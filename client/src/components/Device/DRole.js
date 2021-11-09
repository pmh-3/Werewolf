import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";
import io from "socket.io-client";
const socket = io('http://127.0.0.1:6006');



function DRole({gotoHandle, Gcode}) {
    const history = useHistory();
    const [code, setCode] = useState(Gcode);
    const [role, setRole] = useState('werewolf');
    const [instructions, setIns] = useState('You must remain undetected while you eliminate villagers during the night.')
    const [timeLeft, setTime] = useState(0);

    useEffect(()=>{
        //receive role from server 
        setRole('Werewolf');
        socket.emit('startTimer', 7, 'night', code);
    },[])

    
    socket.on('counter', (t) => {
      console.log(t);
      setTime(t);
    })

    socket.on('timesUp', (nextPage) => {
      console.log('Go to ' + nextPage);
      gotoHandle(nextPage);
    })
  
    const showTime = (timeLeft)=>{
      if (timeLeft <= 2)  
        return "Time is up!";
      else 
        return timeLeft - 2;
    }

  return (
      <>
      <div>
        <h1>
        DEVICE ROLE PAGE   
        </h1> 
        <h2>
        You are a {role}
        </h2>
        <h2>
        {instructions}
        </h2>
        <h2>
        Time left: {showTime(timeLeft)}
        </h2>

       {/* <button  onClick={() => gotoHandle("night")} >GoToNightButton</button> */}
      </div>
      </>
  )
}
export default DRole;