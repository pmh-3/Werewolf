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
