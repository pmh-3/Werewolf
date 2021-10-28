import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import './SSDay.css';

function SSDay(){
  const history = useHistory();

  return (
      <>
      <div className="ss-day">
        <h1>
        What happened last night
        </h1> 
        <h3>
        Show a list of current players and status 
        Now discuss and vote on whom you think should be kicked out of the town!
        </h3>
      

        <button  onClick={() => history.push("/WelcomePage")} >GoToMain</button>
       
      </div>
      </>
  )
}
export default SSDay;