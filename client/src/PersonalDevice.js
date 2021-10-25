import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

function PersonalDevice(){
  const history = useHistory();

  const [example, setExample] = useState(['Count']);
  const [plays, setPlays] = useState(0);

  const getPlays = async () => {
      const response = await fetch('/getPlays');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return JSON.parse(body.plays);
  };  

  const handleClick = () => {
      getPlays().then((res) =>{
        setPlays(res);
      });
  }

  return (
      <>
        <h1>
        This screen is unique to the player
        </h1> 
        <button onClick={() => handleClick()}>Add Count From Server</button>
        <button  onClick={() => history.push("/")} >Go To SharedScreen</button>
        <h2>
          {example[0]}: {plays}
        </h2>
      </>
  )
}
export default PersonalDevice;