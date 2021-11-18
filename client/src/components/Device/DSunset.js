import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../services/Socket";
import { useRecoilState } from "recoil";
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { roomIdState, playersState } from "../services/Atoms";
import Timer from '../services/Timer';

function DSunset(){
  const history = useHistory();

  const socket = useContext(SocketContext);
  // room id
  const [roomId, setRoomId] = useRecoilState(roomIdState);

  const [banished, setBanished] = useState();

  useEffect(() => {

    socket.on("banished", b => {
      setBanished(b.name);
    })
  });

  return (
      <>
      <div className="sunset text-center font-spooky">
        <h1 className="bg-ice text-teeth text-large">
          SUNSET<br></br>
          </h1>
          <h2 className=" font-read text-medium font-semibold bg-teeth text-ice">
          {banished} has been voted OUT! <br></br>
          {/* IF GAME DIDN'T END, LOOP BACK TO NIGHT PAGE <br></br>
          OTHERWISE GO TO END  */}<br></br>
        </h2>
        
          {/* <button  onClick={() => gotoHandle("end")} >GoToEndButton</button> */}
       
      </div>
      </>
  )
}
export default DSunset;