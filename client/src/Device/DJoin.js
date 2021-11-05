import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../Components/Timer";

function DJoin({gotoHandle}){
  const history = useHistory();


  const timesUp = () => {
    console.log("time up in end")
    gotoHandle("lounge");
  }


  return (
      <>
      <div className="join-instruction">
        <h1>
        DEVICE JOIN PAGE
        </h1> 
        <h2>
        ROOM CODE
        </h2>
        <input type='text' />
        <h2>
        ENTER YOUR NAME
        </h2>
        <input type='text' />
        <Timer timesUp ={timesUp}></Timer>
        <button  onClick={() => gotoHandle("lounge")} >GoToLoungeButton</button>
      </div>
      
      </>
  )
}
export default DJoin;

