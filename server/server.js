//const { query } = require('express');
const express = require('express'); 
//const {readFileSync, writeFileSync} = require('fs');
//const util = require('util');
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 6006; 
const index = require("./routes/index");

const app = express(); 
app.use(index);

//unused for sockets
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

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


//SOCKET IO
// const io = require('socket.io')(app,{
//     cors: {origin: "*"}
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('message', (message) =>   {
//         console.log(message);
//         io.emit('message', `${socket.id.substr(0,2)} said ${message}` );    
//     });
// });



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


// const serverFX = () => {
//     app.get('/getPlays', (req, res) => {

//         const count = readFileSync('./dummyDB.txt', 'utf-8');
//         const newCount = parseInt(count) + 1;

//         writeFileSync('./dummyDB.txt', String(newCount));
//         console.log('new count: ', newCount);

//         res.send({
//             plays: String(newCount)
//         })

//     });

//     app.post('/addLeader', (req, res) => {
//         var Name = req.body.name;
//         res.send(
//         `I received your POST request. This is what you sent me: ${req.body.name}`,
//         );
//     });
// }

// app.listen(port, () => console.log(`Listening on port ${port}`)); 
// serverFX();




