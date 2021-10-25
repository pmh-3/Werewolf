import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

function PersonalDevice(){
    const history = useHistory();

    const [example, setExample] = useState(['a']);

	const addPlay = async (e) => {

		const response = await fetch('/addPlay');
		const body = await response.json();
	
		if (response.status !== 200) {
		  throw Error(body.message) 
		}

	}

    const getPlays = async () => {
        const response = await fetch('/getPlays');
        const body = await response.json();
        //body = JSON.parse(body);
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    };  

    const handleClick = () => {
        addPlay();
    }

    return (
        <>
          <h1>
          This screen is unique to the player
          </h1> 
          <button onClick={() => handleClick()}>CLICK TO ADDPLAY</button>
          <button  onClick={() => history.push("/")} >Click to go to SharedScreen</button>
          <h2>
            {example[0]}
          </h2>
        </>
    )
}
export default PersonalDevice;