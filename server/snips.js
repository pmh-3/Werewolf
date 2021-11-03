// 

//unused for sockets
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//const serverFX = () => {
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

// app.listen(port, () => console.log(`Listening on port ${port}`)); 
// serverFX();



//const {readFileSync, writeFileSync} = require('fs');
//const util = require('util');
//const { query } = require('express');

