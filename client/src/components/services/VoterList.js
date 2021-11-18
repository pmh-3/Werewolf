import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import { useRecoilState } from "recoil";
import { SocketContext } from "../services/Socket";
import { roomIdState, playerNameState, playersState, playerRoleState, playerFinalTargetState, voteSubmittedState} from "../services/Atoms";


// Listen for vote change from other people and show voter list accordingly 

function VoterList({currentTarget, gameState, device}) {
    // SocketContext
    const socket = useContext(SocketContext);
    // my role
    const [playerRole, setPlayerRole] = useRecoilState(playerRoleState);
    // other voter's name
    const [otherVoterName, setOtherVoterName] = useState();
    // other voter's target 
    const [otherVoterTarget, setOtherVoterTarget] = useState();
    // current target's voter list 
    const [voterList, setVoterList] = useState([]);
    // styling for device
    const [style, setStyle] = useState();
    

    useEffect(() => {
      // Update voter list ONLY for wolves during night OR for everyone during the day
      if (gameState === "day" || (gameState === "night" && playerRole === "wolf")) {
        // If otherVoterTarget === currentTarget, check voter list
        if (otherVoterTarget === currentTarget) {
          // Append voter's name if list is empty or if voter's name is not listed yet
          if (voterList === undefined || !voterList.includes(otherVoterName)) {
            const updatedList = [...voterList, otherVoterName];
            setVoterList(updatedList);
          }
        }

        // If otherVoterTarget !== currentTarget, check voter list
        else {
          // If voter list is not empty, traverse list and remove voter's name since voter has changed their vote
          if (voterList !== undefined) {
            const updatedList = voterList.filter(
              (item) => item !== otherVoterName
            );
            setVoterList(updatedList);
          }
        }
      }

      // Voter list only show:
      // 1) on TV during the day, not on PD
      // 2) on wolves' devices during the night 
      if ((gameState === "day" && device === "TV")) {
        setStyle(`rounded-full text-medium h-14 w-24 items-center justify-center bg-teeth mr-4 mt-8`);    
      } 

      if (gameState === "day" && device === "PD") {
        setStyle(`invisible`);
      }

      if (gameState === "night" && playerRole === "wolf") {
        setStyle(`rounded-full text-small h-7 w-12 items-center justify-center bg-teeth mr-4 mt-8`);
      }

    }, [currentTarget, otherVoterName, otherVoterTarget]);


    // Listen for temporary vote from other people 
    socket.on("temporaryVote", (tempVoterName, tempTargetName) => {
        setOtherVoterName(tempVoterName);
        setOtherVoterTarget(tempTargetName);
    });

    return (
        <div>
            {voterList.map((vL) => (
                <ul className = {style}>{vL}</ul>
            ))}
        </div>
    )
}

export default VoterList;