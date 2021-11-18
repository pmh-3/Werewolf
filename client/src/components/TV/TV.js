import React, { useState, useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { SocketContext } from "../services/Socket.js";
import Lounge from "./Lounge.js";
import Role from "./Role.js";
import Night from "./Night.js";
import Sunrise from "./Sunrise.js";
import Day from "./Day.js";
import Sunset from "./Sunset.js";
import End from "./End.js";
import { roomIdState, playersState } from "../services/Atoms";

function TV() {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory
  const history = useHistory();
  // next page state
  const [nextPage, setNextPage] = useState("lounge");
  // player list 
  const [players, setPlayers] = useRecoilState(playersState);

  useEffect(() =>{
   
    socket.on('playerList', pl => {
      setPlayers(pl);
    })
  
    // Receive next page instruction from server 
    socket.on("goToNextPage", (page) => {
      setNextPage(page);
    });
  
    return () =>{
      //clean up
      socket.off("goToNextPage");
      socket.off('playerList');
    }

});

 
  var screen = <></>;

  if (nextPage === "lounge") {
    screen = <Lounge/>;
  } else if (nextPage === "rolePage") {
    screen = <Role/>;
  } else if (nextPage === "nightPage") {
    screen = <Night/>;
  } else if (nextPage === "sunrisePage") {
    screen = <Sunrise/>;
  } else if (nextPage === "dayPage") {
    screen = <Day/>;
  } else if (nextPage === "sunsetPage") {
    screen = <Sunset/>;
  } else if (nextPage === "endPage") {
    screen = <End />;
  } else if (nextPage === "welcomePage") {
    history.push("/")
  }

  return (
    <div>
      <div>{screen}</div>
    </div>
  );
}
export default TV;
