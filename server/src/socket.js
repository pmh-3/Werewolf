const { emit } = require("process");
const Game = require("./utils/Game");
const Player = require("./utils/Player");

let games = [];

let timer = {
  intro: 8,
  night: 20,
  sunrise: 5,
  day: 20,
  sunset: 5,
  end: 3,
};

// Hardcoded player list for now:
const players = ["Peter", "Nirm", "Jason", "Zi", "Alina"];
// Hardcoded wolf list for now:
const wolves = ["Peter", "Nirm"];
// Hardcoded villager list for now:
const villagers = ["Jason", "Zi", "Alina"];

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

     // send role to each respective player using call back 
    socket.on('getRole', function(name, roomCode, fn){
      let game = findGame(roomCode);
      if(game == undefined){
        return;
      }
      console.log('assigning role ' + name);
    
      game.players.forEach((p)=>{
        if(name == p.getPlayer().name){
          //socket.emit("assignedRole", p.getPlayer().role);
          fn({role: p.getPlayer().role});
          console.log('assigning ' + p.getPlayer().role + " to " + p.getPlayer().name + " " + p.getPlayer().socketId + " orr " + socket.id )
        }
      })
    });
    
    // if(s = )
    // game.players.forEach((p)=>{
    //   let id = p.getId();
  
    //   socket.to(id).emit("assignedRole", p.getPlayer().role);
    //     console.log('assigning ' + p.getPlayer().role + " to " + p.getPlayer().name + " " + p.getPlayer().socketId  + "orr" + p.getId())
    // })

  /********************STATE*************************** */
    // Start game
    socket.on("startGameRequest", (roomCode) => {
      if (findGame(roomCode) == undefined) {
        socket.emit("roomNotFound", {error: "Room not found"});
      }else{
        console.log("starting game");
        let game = findGame(roomCode);
        switchState(game, 'intro');
        clock(game);
      }
    });

  
  const switchState = (game, state)=>{
    game.setState(state);
    let roomCode = game.code;
    switch(game.getState()){
      case 'welcome':
        io.to(roomCode).emit("goToNextPage", "welcomePage");
        break;


      case 'intro':
        // After client presses start game, all devices go to role page
        game.assignPlayerRolesAndActions()



        io.to(roomCode).emit("goToNextPage", "rolePage");
        io.to(roomCode).emit("startTimer", timer.intro);
        console.log("intro")
        break;


      case 'night':
        console.log("night");
        io.to(roomCode).emit("goToNextPage", "nightPage");
        io.to(roomCode).emit("startTimer", timer.night);
        //Commence night votes
        voting(game);
        break;


      case 'sunrise':
        console.log("sunrise");
        let eaten = game.countVote(game.getState());
        io.to(roomCode).emit("goToNextPage", "sunrisePage");
        io.to(roomCode).emit("startTimer", timer.sunrise);
        //send eaten to tv
        break;


      case 'day':
        console.log("day");
        io.to(roomCode).emit("goToNextPage", "dayPage");
        io.to(roomCode).emit("startTimer", timer.day);
        //commence day votes
        voting(game);
        break;


      case 'sunset':
        let banished = game.countVote(game.getState());
        console.log("sunset");
        io.to(roomCode).emit("goToNextPage", "sunsetPage");
        io.to(roomCode).emit("startTimer", timer.sunset);
        //send banished to tv
        break;


      case 'end':
        console.log("end")
        io.to(roomCode).emit("goToNextPage", "endPage");
        io.to(roomCode).emit("startTimer", timer.end);
        break;
     }
  }
   
    const clock = (game) =>{
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
          switchState(game,'night');
        } else if (
          totalGameTime ===
          sunrisePageTime + dayPageTime + sunsetPageTime + endPageTime
        ) {
          switchState(game,'sunrise');
        } else if (
          totalGameTime ===
          dayPageTime + sunsetPageTime + endPageTime
        ) {
          switchState(game,'day');
        } else if (totalGameTime === sunsetPageTime + endPageTime) {
          switchState(game,'sunset');
        } else if (totalGameTime === endPageTime) {
          switchState(game,'end');
        } else if (totalGameTime === 0) {
          switchState(game,'welcome');
          clearInterval(countDown);
        }
      }, 1000);
    }
    /********************END STATE*************************** */

    /********************VOTING*************************** */

    const voting = (game)=>{
      console.log("voting");
      let roomCode = game.code;

      if(game.state == 'night'){
        console.log('night vote')
        io.to(roomCode).emit("startVoting", players, wolves, villagers);
      }else{
        io.to(roomCode).emit("startVoting", players, undefined, undefined);
      }

      // Zi: process temporary vote (from wolf during night and from everyone during day)
      socket.on("sendTemporaryVote", (roomCode, playerName, playerTarget) => {
        io.to(roomCode).emit("temporaryVote", playerName, playerTarget);
      }) 

      socket.on("submitVote", (voterRole, targetedPlayer) => {
        // If voter was seer, send back targeted player's identity 
        if (voterRole === "TESTSEER") 
          io.to(roomCode).emit("revealIdentity", "SUPERSTAR");
        
        if (voterRole === "wolf"){
          game.Vote(targetedPlayer,'add');
        }
        if(voterRole === 'healer'){
          game.Vote(targetedPlayer,'delete');
        }
      }); 
    }
       /******************** END VOTING*************************** */


    // Jason: send a list of alive player upon request
    socket.on("req-tv-allplayers-fullinfo", roomCode => {

      // Game Object should have a list of player
      // I am constructing a dumy player object list
      const playerObjList = [];
      let i = 0;
      for (const playerName of players) {
        // param: player's name& socket ID
        let playerObj = new Player(playerName, i);
        playerObj.assignRoleAndAction();
        console.log(playerObj)
        playerObjList.push(playerObj);
        i++;
      }
      io.to(roomCode).emit("res-tv-allplayers-fullinfo", playerObjList);
    })


    socket.on("disconnect", () => {
      // TODO: Remove player from game
      console.log("user disconnected");
    });

  });
};

module.exports = socket;
