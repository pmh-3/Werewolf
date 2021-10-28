import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './Lounge.css';
import villager from './assets/images/roles/villager.png'
import werewolf from './assets/images/roles/werewolf.png'
import healer from './assets/images/roles/healer.png'

function Lounge(){
    const history = useHistory();

  return (
      <>
      <div className="lounge">
        <h1>
        Lounge
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