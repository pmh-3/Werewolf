import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import WelcomePage from './WelcomePage.js';
import JoinInstruction from './JoinInstruction.js';
import Lounge from './Lounge.js';
import GameInstruction from './GameInstruction.js'
import SSDay from './SSDay.js';
import SSNight from './SSNight.js';
import './App.css';



function App() {

  const [state,setState] = useState('init');

  return (

    <div className="App">
    <Router>
    <Route path="/WelcomePage" exact render={() => <WelcomePage />} />
    <Route path="/JoinInstruction" render={() => <JoinInstruction />} />
    <Route path="/Lounge" render={() => <Lounge />} />
    <Route path="/GameInstruction" render={() => <GameInstruction />} />
    <Route path="/SSNight" render={() => <SSNight />} />
    <Route path="/SSDay" render={() => <SSDay />} />
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
