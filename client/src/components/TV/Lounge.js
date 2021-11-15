import React, { useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import { SocketContext } from "../services/Socket";
import { roomIdState, playersState } from "../services/Atoms";

function Lounge() {
  // SocketContext
  const socket = useContext(SocketContext);
  // useHistory - react router dom
  const history = useHistory();
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  // current room players
  const [players, setPlayers] = useRecoilState(playersState);

  // import the audio
  let audio = new Audio("./../assets/audio/wolf_howl.wav")

  //plays a howling sound effect
  const audioOnStart = () => {
    audio.play()
  }

  useEffect(() => {

    if (roomId === undefined) {
      // Create a room
      socket.emit("createRoom");

      // Listen for the room code and update the state
      socket.on("roomCreated", (roomID) => {
        setRoomId(roomID);
      });
    } else {
      console.log("Already in a room");
    }
  });

  // Get updated list of players from server
  socket.on("newPlayer", (players) => {
    setPlayers(players);
  });


  return (
    <>
      <div> {audioOnStart}</div> 
      <div className="lounge font-spooky text-orange">
        <h1 className="text-header absolute top-0 left-3">
          Werewolf
          <p className="text-medium absolute left-3 top-21">
            Lounge
            <p>
              Players:
              {players.map((player) => (
                <li key={player.socketId}>{player.name}</li>
              ))}
            </p>
          </p>
        </h1>
        <p className="text-large absolute top-0 right-10">
          ROOM CODE <br></br>
          <p className="text-header absolute top-201 right-10 bg-orange text-teeth rounded px-10">
            {roomId}
          </p>
        </p>
        <h2 className="absolute bottom-20 left-3 text-medium">
          FIRST Player to join, press start on phone to start game.
        </h2>
        <p className="absolute bottom-5 right-3 text-medium">
          WAITING FOR PLAYERS ...
        </p>
      </div>
    </>
  );
}
export default Lounge;
