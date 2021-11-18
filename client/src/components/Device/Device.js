import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState} from "../services/Atoms";
import DJoin from "./DJoin.js";
import DLounge from "./DLounge.js";
import DRole from "./DRole.js";
import DNight from "./DNight.js";
import DSunrise from "./DSunrise.js";
import DDay from "./DDay.js";
import DSunset from "./DSunset.js";
import DEnd from "./DEnd.js";

function Device() {
  // useHistory
  const history = useHistory();
  // SocketContext
  const socket = useContext(SocketContext);
  // my room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // my role
  const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
  // all players
  const [players, setPlayers] = useRecoilState(playersState);
  // my final target
  const [finalTarget, setFinalTarget] = useRecoilState(playerFinalTargetState);
  // next page state
  const [nextPage, setNextPage] = useState("join");


  useEffect(() =>{

      socket.on('playerList', pl => {
        setPlayers(pl);
      })

      // Receive next page instruction from server 
      socket.on("goToNextPage", (page) => {
        
        // If next page is day or night, we will reset these states   
        if (page === "dayPage" || page === "nightPage") {
          setFinalTarget("");
        }

        // Go to next page     
        setNextPage(page);
      });


    return () =>{
      //clean up
      socket.off("goToNextPage");
      socket.off('playerList');
    }

})

const goto = (newPage) => {
  setNextPage(newPage);
};
 
  // TODO: when all votes are in, will move on to next page ... 
  // TODO: make sure all emits have roomId

  var screen;
  if (nextPage === "join") {
    screen = <DJoin gotoHandle={goto} />;
  } else if (nextPage === "lounge") {
    screen = <DLounge/>;
  } else if (nextPage === "rolePage") {
    screen = <DRole/>;
  } else if (nextPage === "nightPage") {
    screen = <DNight/>;
  } else if (nextPage === "sunrisePage") {
    screen = <DSunrise/>;
  } else if (nextPage === "dayPage") {
    screen = <DDay/>;
  } else if (nextPage === "sunsetPage") {
    screen = <DSunset/>;
  } else if (nextPage === "endPage") {
    screen = <DEnd />;
  } else if (nextPage === "welcomePage") {
    history.push("/");
  }

  return (
    <div>
      <div>{screen}</div>
    </div>
  );
}
export default Device;

// DeviceOrientationEvent;
