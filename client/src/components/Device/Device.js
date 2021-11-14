import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { SocketContext } from "../services/Socket";

import DJoin from "./DJoin.js";
import DLounge from "./DLounge.js";
import DRole from "./DRole.js";
import DNight from "./DNight.js";
import DSunrise from "./DSunrise.js";
import DDay from "./DDay.js";
import DSunset from "./DSunset.js";
import DEnd from "./DEnd.js";

function Device() {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory
  const history = useHistory();
  // next page state
  const [nextPage, setNextPage] = useState("join");


  // Receive next page instruction from server 
  socket.on("goToNextPage", (page) => {
    setNextPage(page);
  });

  const goto = (newPage) => {
    setNextPage(newPage);
  };


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
      PD
      <div>{screen}</div>
    </>
  );
}
export default Device;

// DeviceOrientationEvent;
