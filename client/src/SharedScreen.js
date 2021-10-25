import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

function SharedScreen(){
    const history = useHistory();

    return (
        <>
          <h1>
          Every player can see this SharedScreen
          </h1> 
          <button  onClick={() => history.push("/PersonalDevice")} >Click to go to PersonalDevice</button>
        </>
    )
}
export default SharedScreen;