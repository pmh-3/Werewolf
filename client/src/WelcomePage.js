import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './WelcomePage.css';

function WelcomePage() {
    const history = useHistory();

    const[todos, setTodos]= useState([])

    return (
        <>
        <div className="font-spooky">
          <div className="flex items-center justify-center">
            <p className="pt-24 text-device small:text-computer text-orange">
            Werewolf
            </p> 
          </div>
          <div className="flex items-center justify-center">
            <div className="text-button">
              <button 
                className=" bg-orange text-teeth hover:bg-darkOrange px-10 rounded-full mr-4 inline-flex " 
                onClick={() => history.push("/TV")} 
              >
                START
              </button>
              <button 
                className="bg-orange text-teeth hover:bg-darkOrange px-12 rounded-full inline-flex"
                onClick={() => history.push("/device")} 
              >
                JOIN
              </button>
            </div>
          </div>
        </div>
        </>
    )
}
export default WelcomePage;