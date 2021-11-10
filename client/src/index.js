import React from 'react';
import ReactDOM from 'react-dom';
import { SocketContext, socket } from "./components/services/Socket";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <RecoilRoot>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </RecoilRoot>,
  document.getElementById("root")
);


