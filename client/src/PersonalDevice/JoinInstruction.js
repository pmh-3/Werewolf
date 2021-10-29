import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './JoinInstruction.css';

function JoinInstruction(){
  const history = useHistory();

  // const [example, setExample] = useState(['Count']);
  // const [plays, setPlays] = useState(0);

  // const getPlays = async () => {
  //     const response = await fetch('/getPlays');
  //     const body = await response.json();

  //     if (response.status !== 200) {
  //       throw Error(body.message) 
  //     }
  //     return JSON.parse(body.plays);
  // };  

  // const handleClick = () => {
  //     getPlays().then((res) =>{
  //       setPlays(res);
  //     });
  // }

  return (
      <>
      <div className="join-instruction">
        <h1>
        Werewolf
        </h1> 
        <h2>
        ROOM CODE
        </h2>
        <input type='text' />
        {/* <button onClick={() => handleClick()}>ReturnToMain</button> */}
        <h2>
        ENTER YOUR NAME
        </h2>
        <input type='text' />
        <button  onClick={() => history.push("/PDLounge")} >GoToLounge</button>
      </div>
      
      </>
  )
}
export default JoinInstruction;

