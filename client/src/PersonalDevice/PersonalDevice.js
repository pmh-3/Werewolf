import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import JoinInstruction from './JoinInstruction.js';
import PDLounge from './PDLounge.js';

import villager from '../assets/images/roles/villager.png'
import werewolf from '../assets/images/roles/werewolf.png'
import healer from '../assets/images/roles/healer.png'

function PersonalDevice(){
    const history = useHistory();

    const [selector, setSel] = useState("join");


    useEffect(()=>{
        //receive role from server 

    },[])

    const goto =(res)=>{
        setSel(res);

    }

    var screen = <></>;
    if(selector == "join"){
        screen = <JoinInstruction gotoHandle = {goto}/>;
    }else if(selector == "lounge"){
        screen = <PDLounge/>;
    }

  return (
      <>
      PersonalDevice
      <div>
        {screen}
      </div>
      </>
  )
}
export default PersonalDevice;