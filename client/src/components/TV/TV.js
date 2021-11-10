import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { SocketContext } from "../services/Socket.js";
import Lounge from "./Lounge.js";
import Introduction from "./Introduction.js";
import Night from "./Night.js";
import Sunrise from "./Sunrise.js";
import Day from "./Day.js";
import Sunset from "./Sunset.js";
import End from "./End.js";

function TV() {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory
  const history = useHistory();
  // selector state
  const [selector, setSelector] = useState("init");

  useEffect(() => {
    //receive ... from server
  }, []);

  const goto = (newState) => {
    setSelector(newState);
  };

  var screen = <></>;
  if (selector === "init") {
    screen = <Lounge gotoHandle={goto} />;
  } else if (selector === "startGame") {
    screen = <Introduction gotoHandle={goto} socket={socket} />;
  } else if (selector === "night") {
    screen = <Night gotoHandle={goto} />;
  } else if (selector === "sunrise") {
    screen = <Sunrise gotoHandle={goto} />;
  } else if (selector === "day") {
    screen = <Day gotoHandle={goto} />;
  } else if (selector === "sunset") {
    screen = <Sunset gotoHandle={goto} />;
  } else if (selector === "end") {
    screen = <End />;
  }

  return (
    <>
      TV
      <div>{screen}</div>
    </>
  );
}
export default TV;
