import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import WelcomePage from './WelcomePage.js';
import Device from './Device/Device.js';
import TV from './TV/TV.js';
function App() {

  const [state,setState] = useState('init');
  const [playerState, setPlayerState] = useState('join');
  //default home page is always just "/"

  return (

    <div className="App">
    <Router>
    <Route path="/" exact render={() => <WelcomePage />} /> 
    <Route path="/device" render={() => <Device super = {playerState} />} />
    <Route path="/TV" render={() => <TV super = {state} />} />

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
