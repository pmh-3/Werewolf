import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Timer from "../Components/Timer";


import villager from '../assets/images/roles/villager.png'
import werewolf from '../assets/images/roles/werewolf.png'
import healer from '../assets/images/roles/healer.png'

function DRole({gotoHandle}) {
    const history = useHistory();

    const [role, setRole] = useState('werewolf');
    const [instructions, setIns] = useState('you must remain undetected while you eliminate villagers during the night.')

    useEffect(()=>{
        //receive role from server 
        setRole('Werewolf');
    },[])


    const timesUp = () => {
      console.log("time up in day");
      gotoHandle("night");
    }

    
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

       <Timer timesUp ={timesUp}></Timer>
       <button  onClick={() => gotoHandle("night")} >GoToNight</button>
      </div>
      </>
  )
}
export default DRole;