const express = require('express'); 

const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 6006; 
const index = require("./routes/index");

const app = express(); 
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: { origin: "*" }
});

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if(interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

//socket argument is nothing more than a com channel
const getApiAndEmit = socket => {
    const response = new Date();
    //Emit new message to be consumed by client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));



const createRoom = () => {
    //init player array
    

    //send room code, player array
}

const joinRoom = () => {
    
}

const sendState = () => {
//lounge
//Intro + ROLE
}

const sendEaten = () => {
    
}

const asignRole = () => {

}


