import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './WelcomePage.css';
import SIOEX from './Components/SocketIO_EX'; 


function WelcomePage() {
    const history = useHistory();

    const[todos, setTodos]= useState([])

    return (
        <>
        <div className='welcome-page'>
          <h1>
          Werewolf
          </h1> 
          <button onClick={() => history.push("/TV")} >START</button>
          <button onClick={() => history.push("/device")} >JOIN</button>
          <h1>
            <SIOEX/>
          </h1>
        </div>
        </>
    )
}
export default WelcomePage;