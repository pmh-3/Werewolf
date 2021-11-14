import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from "../services/Timer";

function DLounge({ gotoHandle, Gcode }) {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory - react router dom
  const history = useHistory();
  // current room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // players in the current room
  const [players, setPlayers] = useRecoilState(playersState);
  



  socket.on("newPlayer", (players) => {
    console.log("newPlayer event detected");
    setPlayers(players);
  });

  const startGame = () => {
    // Tell server to start game
    socket.emit("startGameRequest", roomId);
  };

  return (
    <>
      <div className="lounge">
        <h1>LOUNGE</h1>
        {/* <h1>First Player to join, starts the game.</h1> */}
        <br></br>
        <h3>Waiting for players...</h3>
        <div>
          <h2 className="block font-bold">Player List</h2>
          <div className="inline-flex">
            {players.map((player) => (
              <div
                key={player.socketId}
                className="rounded-full h-24 w-24 flex items-center justify-center bg-indigo-500 mr-4"
              >
                <div className="text-center">{player.name}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => startGame()} disabled={players.length < 3}>
          Start Game
        </button>
        {players.length < 3 && (
          <p>Minimum 3 players required to start the game</p>
        )}
      </div>
    </>
  );
}

export default DLounge;
