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

function DLounge() {
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
      <div className="lounge font-spooky text-orange text-medium">
        <h1 className="text-large">LOUNGE</h1>
        {/* <h1>First Player to join, starts the game.</h1> */}
        <h2 className="block font-bold">Players: </h2>
        <h3 className=" absolute bottom-5">Waiting for players...</h3>
        <br></br>
        <div>
          <div className="grid gap-4 grid-cols-3">
            {players.map((player) => (
              <div
                key={player.socketId}
                className="rounded-full h-24 w-28 flex items-center justify-center bg-teeth mr-4"
              >
                <div className="text-center">{player.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-20">
          <button
            className="bg-orange text-teeth text-button hover:bg-darkOrange rounded py-1 px-12 "
            onClick={() => startGame()}
            disabled={players.length < 3}
          >
            Start Game
          </button>
        </div>
        <div className="flex items-center justify-center">
          {players.length < 3 && (
            <p>3 players required</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DLounge;
