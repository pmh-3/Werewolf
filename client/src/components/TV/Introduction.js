import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

function Introduction({gotoHandle, socket}){
  const [mySocket, setSocket] = useState(socket);
  const history = useHistory();

  useEffect(() =>{
  

  },[])

  mySocket.on("timesUp", nextPage => {
    if (nextPage === "night") {
      console.log("go to NIGHT");
      gotoHandle(nextPage);
    }
  })


  return (
      <>
      <div className="introduction text-orange font-spooky"> 
        <h1 className="text-center text-large">
        Wolves have infiltrated the town!<br></br>
        The wolves will kill once night falls.<br></br>
        The town's destiny depends on the villagers!<br></br>
        Everyone will vote to kick out someone once day breaks.<br></br>
        Don't trust anyone with your identity!<br></br> Good luck!
        </h1>   
        {/* <button className="text-medium absolute bottom-5 left-3"  onClick={() => gotoHandle("night")} >GoToNight</button> */}
      </div>
      </>
  )
}
export default Introduction;