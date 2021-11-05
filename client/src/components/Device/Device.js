import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import DJoin from './DJoin.js';
import DLounge from './DLounge.js';
import DRole from './DRole.js';
import DNight from './DNight.js';
import DSunrise from './DSunrise.js';
import DDay from './DDay.js';
import DSunset from './DSunset.js';
import DEnd from './DEnd.js';

import villager from '../../assets/images/roles/villager.png'
import werewolf from '../../assets/images/roles/werewolf.png'
import healer from '../../assets/images/roles/healer.png'

function Device(){
    const history = useHistory();
    const [selector, setSel] = useState("join");


    useEffect(()=>{
        //receive role from server 

    },[])

    const goto =(newState)=>{
        setSel(newState);

    }

    var screen = <></>;
    if(selector == "join"){
        screen = <DJoin gotoHandle = {goto}/>
    }else if(selector == "lounge"){
        screen = <DLounge gotoHandle = {goto}/>
    }else if(selector == "role") {
        screen = <DRole gotoHandle = {goto}/>
    }else if(selector == "night") {
        screen = <DNight gotoHandle = {goto}/>
    }else if(selector == "sunrise") {
        screen = <DSunrise gotoHandle = {goto}/>
    }else if(selector == "day") {
        screen = <DDay gotoHandle = {goto}/>
    }else if(selector == "sunset") {
        screen = <DSunset gotoHandle = {goto}/>
    }else if(selector == "end") {
        screen = <DEnd/>
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
export default Device;

// DeviceOrientationEvent;
