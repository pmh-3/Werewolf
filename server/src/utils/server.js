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
//         })


//    //Utility
//    const tiktok = (time) => {
//     console.log('test time: ', time)
//     time--;
//     if(time == 0){
//       return true;
//     }
//     return false;
// }

// const gameTimer = (game) => {
//   setInterval(, 1000);
//   switchState(game, "intro");
//   while(Clock(timer.intro) && game.getState() == 'intro');
//   switchState(game, "night");
//   while(Clock(timer.night) && game.getState() == 'night');
//   switchState(game, "sunrise");
//   while(Clock(timer.sunrise) && game.getState() == 'sunrise');
//   switchState(game, "day");
//   while(Clock(timer.day) && game.getState() == 'day');
//   switchState(game, "sunset");
//   while(Clock(timer.sunset) && game.getState() == 'sunset');
//   switchState(game, "end");
//   while(Clock(timer.end) && game.getState() == 'end');
//   switchState(game, "welcome");
// }

//         /***********************Example ***************************/
// let interval;
