const express = require('express'); 
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 6006; 
const index = require("./routes/index");
const app = express(); 
var Game = require('./Game');
const { count, timeLog } = require('console');
const { compileFunction } = require('vm');

//If Executioin policy is disabled run: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
app.use(index);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

const rooms = { }
var games = []

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("create-room", () => {
        console.log("room created");
        code = createRoom();
        socket.join(code);
        //may have to return directly to client if concurent games
        io.emit("code", code);
    });

    socket.on("join", (code, name)=> {

        //can only join an existing game
        if(rooms[code] != null){
            console.log("player joined", code, name);
            socket.join(code);
            rooms[code].users[socket.id] = name;
            currentGame = games[0];
            for(g in games){
                if(g.code === code){
                    currentGame = g;
                }
            }
            currentGame.addPlayer(name);
            io.to(code).emit('joined', name);
        }
    });

    

    socket.on("startTimer", function(timerLength, nextPage, code) {
        console.log(nextPage + "timer started");
        socket.join(code);
        let countDown = setInterval(function() {
            io.to(code).emit('counter', timerLength);
            timerLength--;
            if (timerLength ==== 0) {
                console.log("times up!!!!!!");
                io.to(code).emit('timesUp', nextPage);
                clearInterval(countDown);
            }
        }, 1000);
    });


    
});//io.off


const createRoom = () => {
    code = makeid();
    console.log(`creating room ${code}`);
    game = new Game(code);
    rooms[code] = { users: {} };
    games.push(game);
    return code;
}

function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}


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

server.listen(port, () => console.log(`Listening on port ${port}`));

/***********************Example ***************************/
//     //socket argument is nothing more than a com channel
//     const getApiAndEmit = socket => {
//         const response = new Date();
//         //Emit new message to be consumed by client
//         socket.emit("FromAPI", response);

//         if(interval) {
//             clearInterval(interval);
//         }
//         interval = setInterval(() => getApiAndEmit(socket), 1000);
//         socket.on("disconnect", () => {
//             console.log("Client disconnected");
//             clearInterval(interval);
//         });
//         /***********************Example ***************************/
// let interval;