import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playerNameState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
import VoterList  from './VoterList';


  // If time is up and user did not click SUBMIT, will submit last pick for them (implemented in Device.js) 
  // If user clicked SUBMIT but did not select a target, will submit default "noVote".


function Vote({showTargets, gameState}) {
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
    // Initialize voteComplete
    const [voteSubmitted, setVoteSubmitted] = useRecoilState(voteSubmittedState);
    // wait message 
    const [waitMessage, setWaitMessage] = useState();
    // sorry message
    const [sorryMessage, setSorryMessage] = useState();


    useEffect(() => {
        // Send temporary vote to server (ONLY for wolves during night OR for everyone during day)
        if (gameState === "day" || (gameState === "night" && playerRole === "wolf"))
            socket.emit("sendTemporaryVote", roomId, playerName,  finalTarget);

    }, [finalTarget]);

    // Upon picking a player 
    const saveTarget = (target) => {
        // If vote has not been submitted
        if (!voteSubmitted)
            // Update vote based on the most recent pick 
            setFinalTarget(target);
        

        // If vote has been submitted, display sorry message 
        if (voteSubmitted)
            setSorryMessage(`Sorry, you cannot change your vote after submitting.`);
    }

    // Upon submitting the vote  
    const submitFinalVote = (e) => {
        e.preventDefault(); // Prevent page refresh

        // Update voteSubmittedState
        setVoteSubmitted(true);

        // Send vote to server for processing 
        socket.emit("submitVote", roomId, playerRole, finalTarget);
       
        // Display wait message
        setWaitMessage(`Waiting for other players to vote...`);
    };


    return (
        <div>
        <p> MAKE YOUR VOTE BELOW:
            {showTargets.map((t) => (
                <li>
                    <button onClick={() => saveTarget(t)} >{t}</button>
                    <h2><VoterList currentTarget = {t} gameState = {gameState}/></h2>
                
                </li>

            ))}
        </p>
        <br></br>  
        <form onSubmit = {submitFinalVote}>
          <button> SUBMIT! </button>
        </form>
        <h2>You picked: {finalTarget}</h2>
        <h2>{waitMessage}</h2>
        <h2>{sorryMessage}</h2>
        </div>
    )
}

export default Vote;