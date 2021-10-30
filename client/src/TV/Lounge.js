import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './Lounge.css';
import villager from './assets/images/roles/villager.png'
import werewolf from './assets/images/roles/werewolf.png'
import healer from './assets/images/roles/healer.png'

function Lounge(){
  const history = useHistory();
  const [code, setCode] = useState("");
  const [isReady, setisReady] = useState(0);

  const createRoom = ()=>{
    setCode("XYZ");
    //call Server to create a room and return a code
    return code;
  }

  
  useEffect(() =>{
    createRoom();
  },[])

  //Server sends a message to this page to start the game by moving to instructions

  return (
      <>
      <div className="lounge">
        <h1>
        Lounge
        </h1> 
        <h1>
        Enter ROOM CODE: {code}
        </h1>
        <h1>
          First Player to join, starts the game.
        </h1>

        <button  onClick={() => history.push("/GameInstruction")} >GoToInstruction</button>

    
        <img className='villager' src={villager}></img> 
        <img className='werewolf' src={werewolf}></img> 
        <img className='healer' src={healer}></img> 

        <h3>
        WAITING FOR PLAYERS ...
        </h3>
        
      </div>
      </>
  )
}
export default Lounge;