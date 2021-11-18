const { emit } = require("process");
const Game = require("./utils/Game");
const Player = require("./utils/Player");

let games = [];

let timer = {
  intro: 10,
  night: 10,
  sunrise: 10,
  day: 10,
  sunset: 10,
  end: 10,
};

// Hardcoded player list for now:
const players = ["Peter", "Nirm", "Jason", "Zi", "Alina"];
// Hardcoded wolf list for now:
const wolves = ["Peter", "Nirm"];
// Hardcoded villager list for now:
const villagers = ["Jason", "Zi", "Alina"];

//TODO
//Build and Send the entire playerStore object to every client to store in atom
//might be easiest at the moment to send names and roles and parse on client side as needed
//If you can think of a way to send only the neccesary info then do that
const playerStore = {
  //might need socketid to use as stable key for mapping
  all: [{name: "Peter", role: 'wolf', id: 'socketid'}, {name: "Nirm", role: 'wolf'}, {name: "Jason"},{name: "Zi" } , {name: "Alina"}],

  //maybe not needed if roles are sent 
  wolves: [{name: "Peter"}, {name: "Nirm"}],
  
  villagers: [{name: "Jason"},{name:"Zi" } , {name: "Alina"}],

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
      if (findGame(roomCode) !== undefined && findGame(roomCode).getState() === "lounge") {
        // Find game in the games[] array
        let game = findGame(roomCode);
        console.log(`Game: ${game}`);
        // Create a new player and add it to the game

        let player = new Player(playerName, socket.id);
        game.addPlayer(player);
        // Join the socket to the room requested
        socket.join(roomCode);

        // Broadcast when a player connects to a room
        io.to(roomCode).emit("playerList", game.getPlayers());
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

            io.to(p.socketId).emit("assignedRole", {
              role: p.role,
            });
            console.log(
              "assigning " +
                p.getPlayer().role +
                " to " +
                p.getPlayer().name +
                " " +
                p.getPlayer().socketId
            );
          });
          io.to(roomCode).emit("startTimer", timer.intro);
          console.log("intro");
          break;

        case "night":
          console.log("night");
          io.to(roomCode).emit("goToNextPage", "nightPage");
          io.to(roomCode).emit("startTimer", timer.night);
          vote(game);
          break;

        case "sunrise":
          console.log("sunrise");
          //keep in mind sometimes nobody can be eaten
          let eaten = game.countVote(game.getState());
          
          io.to(roomCode).emit("goToNextPage", "sunrisePage");
          io.to(roomCode).emit("startTimer", timer.sunrise);

          if(eaten != null){
            console.log(eaten.name,' was eaten');
            io.to(roomCode).emit("eaten", eaten.name);
          }
          if(game.saved != null){
            io.to(roomCode).emit('saved', game.saved.name);
          }
        
          //send entire player list to all clients
          //I know ppl could cheat if they wanted to 
          //fix it if you want but this is a simple option for now
          //maybe client side can take only info needed for role
          //or server creates and sends individual list to every client
          io.to(roomCode).emit('playerList', game.getPlayers());
          game.resetVotes();
          break;

        case "day":
          console.log("day");
          io.to(roomCode).emit("goToNextPage", "dayPage");
          io.to(roomCode).emit("startTimer", timer.day);
          vote(game);
          break;

        case "sunset":
          let banished = game.countVote(game.getState());
          
          console.log("sunset");
          io.to(roomCode).emit("goToNextPage", "sunsetPage");
          io.to(roomCode).emit("startTimer", timer.sunset);

          if(banished != null){
            console.log(banished.name,' was banished');
            io.to(roomCode).emit("banished", banished);
          }

          game.resetVotes();
          break;

        case "end":
          console.log("end");
          io.to(roomCode).emit("goToNextPage", "endPage");
          io.to(roomCode).emit("startTimer", timer.end);
          break;
      }
    };


    /********************END STATE*************************** */

    /********************VOTING*************************** */

    const vote = (game) =>{
      let wolfList = [];
      let villagerList = [];

      game.getPlayers().forEach(p =>{
          const { role } = p;
          const { name } = p;

          if(role == 'wolf'){
            console.log('new wolf: ', name)
            wolfList.push(p);
          }else{
            console.log('new villager: ', name)
            villagerList.push(p);
          }

      });

      console.log("wolf List: " + findByRole(game, 'wolf'));
      console.log("villager list:" + villagerList);
      console.log("night vote");
      io.to(game.code).emit("startVoting", wolfList, villagerList, game.getPlayers());
    }

     // Zi: process temporary vote (from wolf during night and from everyone during day)
     socket.on("sendTemporaryVote", (roomCode, playerName, playerTarget) => {
      io.to(roomCode).emit("temporaryVote", playerName, playerTarget);
    });


    socket.on("submitVote", (ballot) => {
      if( ballot == undefined ){ 
        console.log('ballot undefined')
        return; 
      }
      if (findGame(ballot.room) == undefined) {
        return;
      }

      let game = findGame(ballot.room);
      console.log("Vote Recorded: " , ballot.voterName ," the ", ballot.role + ", targets: " + ballot.target);

      // count all votes to switch to next state when everyone has voted.
      game.Vote(ballot.target, 'count');

      if(ballot.time == 'night'){
        // If voter was seer, send back targeted player's identity to seer
        if ( ballot.role === "seer"){
            reveal(game, ballot.target);
        }

        if (ballot.role === "wolf") {
          game.Vote(ballot.target, "add");
        }

        if (ballot.role === "healer") {
          game.Vote(ballot.target, "delete");
        }

        // Nothing is being done with villager vote at night at the moment
        if (ballot.role == 'villager'){}

      }else if(ballot.time == 'day'){
      // treat all day votes the same
        game.Vote(ballot.target, 'add');
      }

      //// still testing
      // if(game.isAllVotesIn() && game.getState() == 'night'){
      //   switchState(game,'sunrise')
      // }else if(game.isAllVotesIn() && game.getState() == 'day'){
      //   switchState(game,'sunset')
      // }

    });
    /******************** END VOTING*************************** */

    /******************** TOOLS*************************** */

    // TODO client side recieve

  const findByName = (game, name) => {
    return game.getPlayers().find(p => p.name === name);
  }

  const findByRole = (game, role) => {
    return game.getPlayers().find(p => p.role=== role);
  }

  const reveal = (game, name) => {
    
    let seer = findByRole(game, 'seer');
    let revealed = findByName(game, 'name');
    io.to(seer.socketId).emit("assignedRole", {
      role: revealed.role,
    });

  }


  const clock = (game) => {
    switchState(game, "intro");
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

    /********************END TOOLS*************************** */

    socket.on("disconnect", () => {
      // TODO: Remove player from game
      console.log("user disconnected");
    });
  });
};

module.exports = socket;
