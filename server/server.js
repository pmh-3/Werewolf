const express = require('express'); 
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 6006; 
const index = require("./routes/index");
const app = express(); 
var Game = require('./Game');

app.use(index);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

/***********************Example ***************************/
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


//socket argument is nothing more than a com channel
const getApiAndEmit = socket => {
    const response = new Date();
    //Emit new message to be consumed by client
    socket.emit("FromAPI", response);
};
/***********************Example ***************************/

var rooms = [];

socket.on("createRoom", () => {
    code = createRoom();
    io.emit("code", code);
});

const createRoom = () => {

    code = makeid();
    console.log(`creating room ${code}`);
    game = new Game.Game(code);
    rooms.append(game);
    
}

function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

socket.on("join", (code, name)=> {

    for(g in rooms){
        if(g.code == code){
            currentGame = g;
        }
    }
    currentGame.Game.addPlayer(name);
    socket.send("Joined!");
});

const sendState = () => {
    //How do i send the right game's state to the right clients?
    //Does the client have to send the code every time
    //or is there a way to store and emit to specific clients 
}

const recordWolfVotes = () =>{

}

const rescordAllVotes = () => {

}

const sendEaten = () => {
    
}

const asignRole = () => {

}

});//Socket is always on

server.listen(port, () => console.log(`Listening on port ${port}`));