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
        // Find game in the games[] array
        let game = findGame(roomCode);
        console.log(`Game: ${game}`);
        // Create a new player and add it to the game
        let player = new Player(playerName, socket.id);
        game.addPlayer(player);
        // Join the socket to the room requested
        socket.join(roomCode);
        // Broadcast when a player connects to a room
        io.to(roomCode).emit("newPlayer", game.getPlayers());
        console.log("Broadcast emitted");
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

    // Start game
    socket.on("startGameRequest", (roomCode) => {
      if (findGame(roomCode) !== undefined) {
        // Cusomize timer duration for each page 
        const rolePageTime = 10;
        const nightPageTime = 5;
        const sunrisePageTime = 4;
        const dayPageTime = 3;
        const sunsetPageTime = 3;
        const endPageTime = 3;
        // Server will count down using totalGameTime
        let totalGameTime = rolePageTime + nightPageTime + sunrisePageTime +
        dayPageTime + sunsetPageTime + endPageTime;

        // After client presses start game, all devices go to role page 
        io.to(roomCode).emit("goToNextPage", "rolePage");
        io.to(roomCode).emit("startTimer", rolePageTime);

        // Server controls time and tells all devices 
        // 1) When to go to next page 
        // 2) how much time each page has
        let countDown = setInterval(function() {
          totalGameTime--;
          if (totalGameTime === nightPageTime + sunrisePageTime +
            dayPageTime + sunsetPageTime + endPageTime) {
            io.to(roomCode).emit("goToNextPage", "nightPage");
            io.to(roomCode).emit("startTimer", nightPageTime);
          } 
          else if (totalGameTime === sunrisePageTime +
            dayPageTime + sunsetPageTime + endPageTime) {
            io.to(roomCode).emit("goToNextPage", "sunrisePage");
            io.to(roomCode).emit("startTimer", sunrisePageTime);
          } 
          else if (totalGameTime === dayPageTime + sunsetPageTime + endPageTime) {
            io.to(roomCode).emit("goToNextPage", "dayPage");
            io.to(roomCode).emit("startTimer", dayPageTime);
          } 
          else if (totalGameTime === sunsetPageTime + endPageTime) {
            io.to(roomCode).emit("goToNextPage", "sunsetPage");
            io.to(roomCode).emit("startTimer", sunsetPageTime);
          } 
          else if (totalGameTime === endPageTime) {
            io.to(roomCode).emit("goToNextPage", "endPage");
            io.to(roomCode).emit("startTimer", endPageTime);
          } 
          else if (totalGameTime === 0) {
            io.to(roomCode).emit("goToNextPage", "welcomePage");
            clearInterval(countDown);
          }
        }, 1000);

      }
    });

    socket.on("disconnect", () => {
      // TODO: Remove player from game
      console.log("user disconnected");
    });

    
  });
};

module.exports = socket;
