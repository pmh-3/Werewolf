import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import SharedScreen from './SharedScreen.js';
import PersonalDevice from './PersonalDevice';
import './App.css';

function App() {

  const [state,setState] = useState('init');

  return (
    <div className="App">
    <Router>
    <Route path="/" exact render={() => <SharedScreen />} />
    <Route path="/PersonalDevice" render={() => <PersonalDevice />} />
    </Router>
    </div>
  )
}

export default App;
