import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState} from "../services/Atoms";
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
  // my final target
  const [finalTarget, setFinalTarget] = useRecoilState(playerFinalTargetState);
  // next page state
  const [nextPage, setNextPage] = useState("join");
  // Initialize voteComplete
  const [voteSubmitted, setVoteSubmitted] = useRecoilState(voteSubmittedState);


  // Receive next page instruction from server 
  socket.on("goToNextPage", (page) => {

    // If player never submitted vote before sunrise, will submit his/her last pick
    if (page === "sunrisePage" && !voteSubmitted)
      socket.emit("submitVote", roomId, playerRole, finalTarget);

    // If next page is day or night, we will reset these states   
    if (page === "dayPage" || page === "nightPage") {
      setVoteSubmitted(false);
      setFinalTarget("");
    }

    // Go to next page     
    setNextPage(page);
  });

  const goto = (newPage) => {
    setNextPage(newPage);
  };


  // TODO: when all votes are in, will move on to next page ... 
  // TODO: make sure all emits have roomId

  var screen = <></>;
  if (nextPage === "join") {
    screen = <DJoin gotoHandle={goto}/>;
  } else if (nextPage === "lounge") {
    screen = <DLounge gotoHandle={goto}/>;
  } else if (nextPage === "rolePage") {
    screen = <DRole gotoHandle={goto}/>;
  } else if (nextPage === "nightPage") {
    screen = <DNight gotoHandle={goto}/>;
  } else if (nextPage === "sunrisePage") {
    screen = <DSunrise gotoHandle={goto} />;
  } else if (nextPage === "dayPage") {
    screen = <DDay gotoHandle={goto} />;
  } else if (nextPage === "sunsetPage") {
    screen = <DSunset gotoHandle={goto} />;
  } else if (nextPage === "endPage") {
    screen = <DEnd />;
  } else if (nextPage === "welcomePage") {
    history.push("/")
  }

  return (
    <>
      <div>{screen}</div>
    </>
  );
}
export default Device;

// DeviceOrientationEvent;
