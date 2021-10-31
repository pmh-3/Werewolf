import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory, useLocation} from "react-router-dom";
import Lounge from './Lounge.js';
import Introduction from './Introduction.js';
import Night from './Night.js';
import Sunrise from "./Sunrise.js";
import Day from "./Day.js";
import Sunset from "./Sunset.js";
import End from "./End.js";


function TV(){
    const history = useHistory();
    const [selector, setSel] = useState('init');

    useEffect(()=>{
        //receive ... from server
    
    },[])

    const goto =(newState)=>{
        setSel(newState); 
    }
    
    var screen = <></>;
    if(selector == "init"){
        screen = <Lounge gotoHandle = {goto}/>
    }else if(selector == "intro"){
        screen = <Introduction gotoHandle = {goto}/>
    }else if(selector == "night") {
        screen = <Night gotoHandle = {goto}/>
    }else if(selector == "sunrise") {
        screen = <Sunrise gotoHandle = {goto}/>
    }else if(selector == "day") {
        screen = <Day gotoHandle = {goto}/>
    }else if(selector == "sunset") {
        screen = <Sunset gotoHandle = {goto}/>
    }else if(selector == "end") {
        screen = <End gotoHandle = {goto}/>
    }else {
        console.log("end of game")
    }

  return (
      <>
      TV
      <div>
        {screen}
      </div>
      </>
  )
}
export default TV;