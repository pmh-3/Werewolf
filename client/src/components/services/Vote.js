import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playerNameState, playersState, playerRoleState, playerFinalTargetState } from "../services/Atoms";
import VoterList  from './VoterList';


  // If time is up and user did not click SUBMIT, will submit last pick for them (implemented in Device.js) 
  // If user clicked SUBMIT but did not select a target, will submit default "noVote".


function Vote({showTargets, gameState, device}) {
    // SocketContext
    const socket = useContext(SocketContext);
    // my room id
    const [roomId, setRoomId] = useRecoilState(roomIdState);
    // my name
    const [playerName, setPlayerName] = useRecoilState(playerNameState);
    // my role
    const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
    // my final target
    const [finalTarget, setFinalTarget] = useRecoilState(playerFinalTargetState);
    // wait message 
    const [waitMessage, setWaitMessage] = useState();
    // sorry message
    const [sorryMessage, setSorryMessage] = useState();
    // set button alignment
    const [buttonAlign, setButtonAlign] = useState();
    // set voterList alignment
    const [listAlign, setListAlign] = useState();
    // set button style
    const [buttonStyle, setButtonStyle] = useState();
    // vote submitted
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    // page content visibility 
    const [invisible, setInvisible] = useState();


    useEffect(() => {
        // Send temporary vote to server (ONLY for wolves during night OR for everyone during day)
        if (gameState === "day" || (gameState === "night" && playerRole === "wolf"))
            socket.emit("sendTemporaryVote", roomId, playerName,  finalTarget);

        // If device is TV, set buttons horizontally with voters' list below 
        // If device is PD, set buttons vertically with voters' list at the side
        if (device === "TV") {
          setButtonAlign(`inline-flex`);
          setListAlign(`flex-col`);   // I changed it back to flex col for voter list to be under button (Z)
          setButtonStyle(`rounded-full h-24 w-28 items-center justify-center bg-teeth mr-4 mt-8`);
          setInvisible(`invisible`);
        }
        if (device === "PD") {
          setButtonAlign(`flex items-center justify-center`);
          setListAlign(`flex items-center justify-center`);
          setButtonStyle(`rounded-full text-medium h-14 w-28 items-center justify-center bg-teeth mr-4 mt-8`);
 
        }

        return () => {
        }

    }, [finalTarget]);

    // Upon picking a player 
    const saveTarget = (target) => {
        // If vote has not been submitted
        if (!voteSubmitted)
            // Update vote based on the most recent pick 
            setFinalTarget(target.name);
        

        // If vote has been submitted, display sorry message 
        if (gameState === "night" && voteSubmitted)
            setSorryMessage(`Sorry, you cannot change your vote after submitting.`);
    }

    // Upon submitting the vote  
    const submitFinalVote = (e) => {
        e.preventDefault(); // Prevent page refresh
        setVoteSubmitted(true);

       let ballot = {
        room: roomId,
        role: playerRole,
        voterName: playerName,
        target: finalTarget,
        time: gameState
       }

        // Send vote to server for processing 
        socket.emit("submitVote", ballot);
        console.log('vote submitted');
        
       
        // Display wait message
        setWaitMessage(`Waiting for other players to vote...`);
    };

//TODO: ADD KEYS using unique and stable id

    return (
      <div>
        <div>
          {" "}
          {showTargets && showTargets.map((t) => (
            <div className = {buttonAlign} key={t.name}>
                <div className = {listAlign} >
                  <button className = {buttonStyle}
                  onClick={() => saveTarget(t)}>{t.name}</button>
                  <VoterList currentTarget={t.name} gameState={gameState} device = {device} />
              </div>
            </div>
          ))}
        </div>
        <div className = {invisible}>
          <button className="bg-orange text-teeth text-button hover:bg-darkOrange rounded py-1 px-12 mt-8" 
          onClick={submitFinalVote}> SUBMIT! </button>
          <h2 className="text-medium">You picked: {finalTarget}</h2>
          <h2>{waitMessage}</h2>
          <h2>{sorryMessage}</h2>
        </div>
      </div>
    );
}

export default Vote;