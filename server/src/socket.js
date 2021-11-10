const Game = require("./utils/Game");
const Player = require("./utils/Player");

let games = [];

const findGame = (code) => {
  return games.find((game) => game.code === code);
};

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("A Player Connected");

    // When a player creates a room
    socket.on("createRoom", () => {
      // var clientIp = socket.request.connection.remoteAddress;
      let newGame = new Game();
      games.push(newGame);
      console.log(games);
      let roomID = newGame.getRoomCode();
      console.log("RoomID: " + roomID + " " + typeof roomID);
      socket.join(roomID);
      socket.emit("roomCreated", roomID);
    });

    // When a player wants to joins a room
    socket.on("joinRoom", (playerName, roomCode) => {
      console.log(`Player ${playerName} trying to join roomCode ${roomCode}`);
      if (findGame(roomCode) !== undefined) {
        let game = findGame(roomCode);
        console.log(`Game: ${game}`);
        let player = new Player(playerName, socket.id);
        game.addPlayer(player);
        socket.join(roomCode);
        // TODO: Delete this later - probably not needed
        socket.emit("joinedRoom", { roomCode, players: game.getPlayers() });
        // Broadcast when a player connects to a room
        socket.broadcast.to(roomCode).emit("newPlayer", game.getPlayers());
      } else {
        socket.emit("roomNotFound");
      }
    });

    // Get room
    socket.on("getRoom", (room) => {
      if (findGame(room) !== undefined) {
        let game = findGame(room);
        socket.emit("roomDetails", game.getRoom());
      } else {
        socket.emit("roomNotFound");
      }
    });

    socket.on("disconnect", () => {
      // TODO: Remove player from game
      console.log("user disconnected");
    });
  });
};

module.exports = socket;
