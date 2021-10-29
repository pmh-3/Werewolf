import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

import villager from '../assets/images/roles/villager.png'
import werewolf from '../assets/images/roles/werewolf.png'
import healer from '../assets/images/roles/healer.png'

function Lounge(){
    const history = useHistory();

    const [role, setRole] = useState('werewolf');
    const [instructions, setIns] = useState('you must remain undetected while you eliminate villagers during the night.')

    useEffect(()=>{
        //receive role from server 
        setRole('Werewolf');
    },[])


  return (
      <>
      <div>
        <h1>
        You are a {role}
        </h1> 
        <h2>
        {instructions}
        </h2>

       <img className='werewolf' src={werewolf}></img> 

      </div>
      </>
  )
}
export default Lounge;