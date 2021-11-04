import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './WelcomePage.css';
import SIOEX from './Components/SocketIO_EX'; 


function WelcomePage() {
    const history = useHistory();

    const[todos, setTodos]= useState([])

    return (
        <>
        <div className="text-center font-spooky">
          <p className="pt-24 text-computer text-orange">
          Werewolf
          </p> 
          <button 
            className="text-8xl bg-orange text-teeth text-button hover:bg-darkOrange px-10 rounded-full mr-4 inline-flex " 
            onClick={() => history.push("/TV")} 
          >
            START
          </button>
          <button 
            className="bg-orange text-teeth text-button hover:bg-darkOrange px-12 rounded-full inline-flex"
            onClick={() => history.push("/device")} 
          >
            JOIN
          </button>
          <h1>
            <SIOEX/>
          </h1>
        </div>
        </>
    )
}
export default WelcomePage;