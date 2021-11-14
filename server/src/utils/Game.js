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
  assignPlayerRoles() {
    // Default case of 3 players
    let assignedRole = {
      wolf: 1,
      villager: 1,
      healer: 1,
      seer: 0,
    };

    // role assignment generation based on total # of players
    if (playerCount > 3) {
      let val =
        playerCount / 10 == 1 ? playerCount / 10 + 0.1 : playerCount / 10;
      console.log(val);
      assignedRole.wolf += Math.ceil(val);
      assignedRole.healer += Math.floor(val);
      assignedRole.seer = Math.ceil(val);
      assignedRole.villager =
        playerCount -
        (assignedRole.wolf + assignedRole.seer + assignedRole.healer);
    }
    // shuffle the current players to allow random assignment of roles
    let shuffledPlayers = this.getPlayers().sort(() => 0.5 - Math.random());
    // assign roles to players
    shuffledPlayers.forEach((player) => {
      // get the available roles for the player
      let availableRoles = Object.keys(assignedRole).filter(
        (role) => assignedRole[role] > 0
      );
      // assign a role to the player
      player.role =
        availableRoles[Math.floor(Math.random() * availableRoles.length)];
      // reduce the assigned role by 1
      assignedRole[player.role]--;
    });
    console.log(this.getPlayers());
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
