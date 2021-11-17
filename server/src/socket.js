const { emit } = require("process");
const Game = require("./utils/Game");
const Player = require("./utils/Player");

let games = [];

let timer = {
  intro: 20,
  night: 60,
  sunrise: 60,
  day: 60,
  sunset: 60,
  end: 60,
};

// Hardcoded player list for now:
const players = ["Peter", "Nirm", "Jason", "Zi", "Alina"];
// Hardcoded wolf list for now:
const wolves = ["Peter", "Nirm"];
// Hardcoded villager list for now:
const villagers = ["Jason", "Zi", "Alina"];

const playerStore = {

  all: ["Peter", "Nirm", "Jason", "Zi", "Alina"],

  wolves: ["Peter", "Nirm"],
  
  villagers: ["Jason", "Zi", "Alina"],

}

const findGame = (code) => {
  return games.find((game) => game.code === code);
};

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("A Player Connected");
    let s = socket.id;
    /********************SET UP*************************** */
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
    /********************END SET UP*************************** */


    /********************STATE*************************** */
    // Start game
    socket.on("startGameRequest", (roomCode) => {
      if (findGame(roomCode) == undefined) {
        socket.emit("roomNotFound", { error: "Room not found" });
      } else {
        console.log("starting game");
        let game = findGame(roomCode);
        switchState(game, "intro");
        clock(game);
      }
    });

    const switchState = (game, state) => {
      game.setState(state);
      let roomCode = game.code;
      switch (game.getState()) {
        case "welcome":
          io.to(roomCode).emit("goToNextPage", "welcomePage");
          break;

        case "intro":
          // After client presses start game, all devices go to role page
          game.assignPlayerRolesAndActions();
          console.log(game.players);

          io.to(roomCode).emit("goToNextPage", "rolePage");
          game.players.forEach((p) => {
            let id = p.getId();

            io.to(p.socketId).emit("assignedRole", {
              role: p.role,
            });
            console.log(
              "assigning " +
                p.getPlayer().role +
                " to " +
                p.getPlayer().name +
                " " +
                p.getPlayer().socketId +
                "orr" +
                p.getId()
            );
          });
          io.to(roomCode).emit("startTimer", timer.intro);
          console.log("intro");
          break;

        case "night":
          console.log("night");
          io.to(roomCode).emit("goToNextPage", "nightPage");
          io.to(roomCode).emit("startTimer", timer.night);
          //Commence night votes
          voting(game);
          break;

        case "sunrise":
          console.log("sunrise");
          let eaten = game.countVote(game.getState());
          io.to(roomCode).emit("goToNextPage", "sunrisePage");
          io.to(roomCode).emit("startTimer", timer.sunrise);
          //send eaten to tv
          break;

        case "day":
          console.log("day");
          io.to(roomCode).emit("goToNextPage", "dayPage");
          io.to(roomCode).emit("startTimer", timer.day);
          //commence day votes
          voting(game);
          break;

        case "sunset":
          let banished = game.countVote(game.getState());
          console.log("sunset");
          io.to(roomCode).emit("goToNextPage", "sunsetPage");
          io.to(roomCode).emit("startTimer", timer.sunset);
          //send banished to tv
          break;

        case "end":
          console.log("end");
          io.to(roomCode).emit("goToNextPage", "endPage");
          io.to(roomCode).emit("startTimer", timer.end);
          break;
      }
    };

    const clock = (game) => {
      const rolePageTime = timer.intro;
      const nightPageTime = timer.night;
      const sunrisePageTime = timer.sunrise;
      const dayPageTime = timer.day;
      const sunsetPageTime = timer.sunset;
      const endPageTime = timer.end;
      // Server will count down using totalGameTime
      let totalGameTime =
        rolePageTime +
        nightPageTime +
        sunrisePageTime +
        dayPageTime +
        sunsetPageTime +
        endPageTime;

      // Server controls time and tells all devices
      // 1) When to go to next page
      // 2) how much time each page has
      let countDown = setInterval(function () {
        totalGameTime--;
        if (
          totalGameTime ===
          nightPageTime +
            sunrisePageTime +
            dayPageTime +
            sunsetPageTime +
            endPageTime
        ) {
          switchState(game, "night");
        } else if (
          totalGameTime ===
          sunrisePageTime + dayPageTime + sunsetPageTime + endPageTime
        ) {
          switchState(game, "sunrise");
        } else if (
          totalGameTime ===
          dayPageTime + sunsetPageTime + endPageTime
        ) {
          switchState(game, "day");
        } else if (totalGameTime === sunsetPageTime + endPageTime) {
          switchState(game, "sunset");
        } else if (totalGameTime === endPageTime) {
          switchState(game, "end");
        } else if (totalGameTime === 0) {
          switchState(game, "welcome");
          clearInterval(countDown);
        }
      }, 1000);
    };
    /********************END STATE*************************** */

    /********************VOTING*************************** */

    const voting = (game) => {
      console.log("voting");
      let roomCode = game.code;

      if (game.state == "night") {
        console.log("night vote");
        io.to(roomCode).emit("startVoting", playerStore);
      } else {
        //TODO send only list of players
        io.to(roomCode).emit("startVoting", playerStore);
      }

      // Zi: process temporary vote (from wolf during night and from everyone during day)
      socket.on("sendTemporaryVote", (roomCode, playerName, playerTarget) => {
        io.to(roomCode).emit("temporaryVote", playerName, playerTarget);
      });


      socket.on("submitVote", (ballot) => {
        console.log("Vote Recorded: " , ballot.voterName ," as a ", ballot.role + " targets: " + ballot.target);
        // If voter was seer, send back targeted player's identity
        if ( ballot.role === "TESTSEER")
          io.to(roomCode).emit("revealIdentity", "SUPERSTAR");

        if (voterRole === "wolf") {
          game.Vote(targetedPlayer, "add");
        }
        if (voterRole === "healer") {
          game.Vote(targetedPlayer, "delete");
        }
        //DAY
        if (ballot.role === 'day'){
          
        }
      });
    };
    /******************** END VOTING*************************** */

    socket.on("disconnect", () => {
      // TODO: Remove player from game
      console.log("user disconnected");
    });
  });
};

module.exports = socket;
