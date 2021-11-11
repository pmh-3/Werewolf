import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Timer from "../services/Timer";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playerNameState, playersState } from "../services/Atoms";

function DJoin({ gotoHandle }) {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory - react router dom
  const history = useHistory();
  // current player name
  const [playerName, setPlayerName] = useRecoilState(playerNameState);
  // room code to be joined
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the room
  const [players, setPlayers] = useRecoilState(playersState);
  // room not found
  const [roomNotFound, setRoomNotFound] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Joining room...");
    let formData = new FormData(e.target);
    let name = formData.get("playerName");
    let code = formData.get("roomCode");
    setPlayerName(name);
    socket.emit("joinRoom", name, code);
    socket.on("newPlayer", (players) => {
      setRoomNotFound(false);
      setRoomId(code);
      setPlayers(players);
      console.log("newPlayer event detected");
      gotoHandle("lounge");
    });
  };

  // If room not found
  socket.on("roomNotFound", () => {
    setRoomNotFound(true);
  });

  return (
    <>
      <div className="join-instruction">
        <h1>DEVICE JOIN PAGE</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>ROOM CODE:</h2>
            <input
              type="text"
              name="roomCode"
              placeholder="Enter room code"
              className="border-2 rounded p-2 mr-2 block my-2"
            />
          </label>
          <label>
            <h2>ENTER YOUR NAME:</h2>
            <input
              type="text"
              name="playerName"
              placeholder="Enter your name"
              className="border-2 rounded p-2 mr-2 block my-2"
            />
          </label>
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            JOIN
          </button>
        </form>
        {roomNotFound && (
          <div className="text-red-500 text-center">
            <p>Room not found</p>
          </div>
        )}
        {/* <Timer timesUp={timesUp}></Timer>
        <button onClick={timesUp}>gotoLounge</button> */}
      </div>
    </>
  );
}
export default DJoin;
