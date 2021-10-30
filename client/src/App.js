import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import WelcomePage from './WelcomePage.js';
import JoinInstruction from './PersonalDevice/JoinInstruction.js';
import Lounge from './TV/Lounge.js';
import GameInstruction from './TV/GameInstruction'
import SSDay from './TV/SSDay.js';
import SSNight from './TV/SSNight.js';
import './App.css';
import PDLounge from './PersonalDevice/PDLounge.js';
import PDDay from './PersonalDevice/PDDay.js';
import PDNight from './PersonalDevice/PDNight.js';
import Role from './PersonalDevice/Role';
import Device from './PersonalDevice/PersonalDevice.js';


function App() {

  const [state,setState] = useState('init');
  const [playerState, setPlayerState] = useState('join');
  //default home page is always just "/"

  return (

    <div className="App">
    <Router>
    <Route path="/" exact render={() => <WelcomePage />} /> 
    <Route path="/JoinInstruction" render={() => <JoinInstruction />} />
    <Route path="/Lounge" render={() => <Lounge />} />
    <Route path="/PDLounge" render={() => <PDLounge />} />
    <Route path="/GameInstruction" render={() => <GameInstruction />} />
    <Route path="/SSNight" render={() => <SSNight />} />
    <Route path="/SSDay" render={() => <SSDay />} />
    <Route path="/Role" render={() => <Role />} />
    <Route path="/PDNight" render={() => <PDNight />} />
    <Route path="/PDDay" render={() => <PDDay />} />
    <Route path="/device" render={() => <Device super = {playerState} />} />

    </Router>
    </div>

    
  )
}

// function Button(props) {
//   const {onPress, tlte = 'Save'} = props;
//   return (
//     <Pressable style={styles.button} onPress={onPress}>
//       <Text style={styles.text}>{title}</Text>
//       </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'black',
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
// });


export default App;
