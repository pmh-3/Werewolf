module.exports = class Game {
  constructor(code) {
    this.code = this.generateRoom(4);
    this.players = [];
    this.gameState = "lounge";
  }

  getRoomCode() {
    return this.code;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p.id !== player.id);
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(index) {
    return this.players[index];
  }

  // GameState can be: 
  // lounge, night,day
  // for night& day, special its # as well
  // if # is needed for lounge, assign it 0 
  getGameState() {
    return this.gameState;
  }

  getRoom() {
    return {
      code: this.code,
      players: this.players,
      gameState: this.gameState,
    };
  }

  // according to total # of players, assign them a role
  // param: playerNum: total number of players
  assignPlayerRoles(playerNum) {
    // initial total# of each role as 0 
    let {wolfLimit, seererLimit, healerLimit, villagerLimit} = this.getRoleNumberLimit(playerNum)
    // Jason: I do not randomize players' role here for debug purposes
    // TODO: implement a robust role assignment solution
    i = 0
    while (i < playerNum) {
      if (wolfLimit > 0) {
        this.getPlayer(i) = "werewolf";
        wolfLimit--;
      } else if (villagerLimit > 0) {
        this.getPlayer(i) = "villager";
        villagerLimit--;
      } else if (seererLimit > 0) {
        this.getPlayer(i) = "seer";
        seererLimit--;
      } else {
        this.getPlayer(i) = "healer"
        healerLimit--;
      }
      i++;
    }
  }

  getRoleNumberLimit(playerNum) {
    let wolfLimit = 0;
    let seererLimit = 0;
    let healerLimit = 0;
    let villagerLimit = 0;
    switch(playerNum) {
      case 0:
      case 1: 
        // TODO: throw some exception 
        // for now: console.log to show dev the problem
        console.log("more players needed: ${playNum} is not enough");
        break;
      case 2: 
        wolfLimit = 1;
        villagerLimit = 1;
        break;
      case 3: 
        wolfLimit = 1; 
        seererLimit = 1;
        villagerLimit = 1;
        break;
      case 4: 
        wolfLimit = 1; 
        seererLimit = 1;
        healerLimit = 1;
        villagerLimit = 1;
        break;
      case 5: 
        wolfLimit = 1; 
        seererLimit = 1;
        healerLimit = 1;
        villagerLimit = 2;
        break;
      case 6: 
        wolfLimit = 2; 
        seererLimit = 1;
        healerLimit = 1;
        villagerLimit = 2;
        break;
      default: 
        wolfLimit = 2; 
        seererLimit = 1;
        healerLimit = 1;
        villagerLimit = playerNum-(wolfLimit + seererLimit + healerLimit);
    }
    return {wolfLimit, seererLimit, healerLimit, villagerLimit}
  }

  generateRoom(length) {
    let result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++)
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    return result;
  }
  
};
