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
    socket.on("playerList", (players) => {
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
      <div className="join-instruction text-medium font-spooky text-orange text-center">
        <h1>PLEASE ENTER</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>ROOM CODE</h2>
            <input
              type="text"
              name="roomCode"
              placeholder="room code"
              className="border-4 border-ice rounded-full container mx:auto px-4  p-2 block my-3 placeholder-orange placeholder-opacity-50"
            />
          </label>
          <label>
            <h2>ENTER YOUR NAME</h2>
            <input
              type="text"
              name="playerName"
              className="border-4 border-ice rounded-full block p-2 mt-3 mb-6 container placeholder-orange placeholder-opacity-50"
              placeholder="name "
            />
          </label>
          <button
            type="submit"
            className="bg-orange text-teeth hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-5 py-2.5"
          >
            JOIN
          </button>
        </form>
        {roomNotFound && (
          <div className="text-red-500 text-center">
            <p>Room not found</p>
          </div>
        )}
      </div>
    </>
  );
}
export default DJoin;
