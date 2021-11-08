import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../services/Timer";
import io from "socket.io-client";
const socket = io('http://127.0.0.1:6006');

function DJoin({gotoHandle, setCodeHandle}){
  const history = useHistory();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const timesUp = () => {
    console.log("time up in end")
    gotoHandle("lounge");
  }

  const joinGame = () => {
    console.log("joining game");
    socket.emit('join', code, name);
    setCodeHandle(code);
    gotoHandle("lounge");
  }

  return (
      <>
      <div className="join-instruction">
       <h1>
        DEVICE JOIN PAGE
        </h1> 
        <form onSubmit={joinGame}>
          <label>
          <h2>
          ROOM CODE:
          </h2>
            <input type= "text" value={code} onChange= {(c) => {setCode(c.target.value)}}/>
          </label>
          <label>
              <h2>
            ENTER YOUR NAME:
            </h2>
            <input type= "text" value={name} onChange={(n) => {setName(n.target.value)}}/>
          </label>
          <input type="submit" value="Join" /> 
        </form>


        <Timer timesUp ={timesUp}></Timer>
        <button  onClick={timesUp} >gotoLounge</button>
      </div>
      
      </>
  )
}
export default DJoin;

