import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playerNameState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState } from "../services/Atoms";
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

    const [voteSubmitted, setVoteSubmitted] = useState(false);



    useEffect(() => {
        // Send temporary vote to server (ONLY for wolves during night OR for everyone during day)
        if (gameState === "day" || (gameState === "night" && playerRole === "wolf"))
            socket.emit("sendTemporaryVote", roomId, playerName,  finalTarget);

        // If device is TV, set buttons horizontally with voters' list below 
        // If device is PD, set buttons vertically with voters' list at the side
        if (device === "TV") {
          setButtonAlign(`inline-flex`);
          setListAlign(`flex-col`);
          setButtonStyle(`rounded-full h-24 w-24 items-center justify-center bg-teeth mr-4 mt-8`);
        }
        if (device === "PD") {
          setButtonAlign(`flex-col`);
          setListAlign(`inline-flex`);
          setButtonStyle(`rounded-full h-14 w-14 items-center justify-center bg-teeth mr-4 mt-8`);
        }

        return () => {
            if(!voteSubmitted){
                submitFinalVote();
            }
        }

    }, [finalTarget]);

    // Upon picking a player 
    const saveTarget = (target) => {
        // If vote has not been submitted
        if (!voteSubmitted)
            // Update vote based on the most recent pick 
            setFinalTarget(target.name);
        

        // If vote has been submitted, display sorry message 
        if (voteSubmitted)
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
          <h2>MAKE YOUR VOTE BELOW:</h2>
          {showTargets.map((t) => (
            <div className = {buttonAlign} key={t.name}>
                <div className = {listAlign} >
                  <button className = {buttonStyle}
                  onClick={() => saveTarget(t)}>{t.name}</button>
                  <VoterList currentTarget={t.name} gameState={gameState} device = {device} />
              </div>
            </div>
          ))}
        </div>
        <br></br>
          <button onClick={submitFinalVote}> SUBMIT! </button>
        <h2>You picked: {finalTarget}</h2>
        <h2>{waitMessage}</h2>
        <h2>{sorryMessage}</h2>
      </div>
    );
}

export default Vote;