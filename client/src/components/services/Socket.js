import socketio from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://http://45.79.65.55/";
export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();
