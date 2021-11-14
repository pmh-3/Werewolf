const { get } = require("https");

module.exports = class Player {
  constructor(name, socketId) {
    this.name = name; // string representation of the player
    this.socketId = socketId; // player's socket id
    this.role = null; // "werewolf", "seer", "healer", "villager"
    this.action = null; // to kill, to see, to heal , to vote
  }

  getPlayer() {
    return {
      name: this.name,
      socketId: this.socketId,
      role: this.role,
      action: this.action,
    };
  }

  getRole() {
    return this.role;
  }

  getAction() {
    return this.action;
  }

  // Jason: in the future assignRoleAndAction() take at least a param
  assignRoleAndAction() {
    // game roles
    let roles = ["werewolf", "seer", "healer", "villager"];
    // get random role
    let randomIndex = Math.floor(Math.random() * roles.length);
    // assign random role
    this.role = roles[randomIndex];
    // assign action based on role
    switch (this.role) {
      case "werewolf":
        this.action = "kill";
        break;
      case "seer":
        this.action = "see";
        break;
      case "healer":
        this.action = "heal";
        break;
      case "villager":
        this.action = "vote";
        break;
      default:
        this.action = "vote";
    }
  }

  // Jason: added this
  // during night, seer, werewolf, healer takes action in order;
  // during day, everyone can vote
  executeAction(gameState) {
    if (ture) {
      // true: placeholder for gameState == "night"
      switch (this.getAction()) {
        case "kill":
          // to kill
          break;
        case "see":
          // to see
          break;
        case "heal":
          // to heal
          break;
        default:
        // villager does nothing
      }
    } else {
      // gameState == "day", when all player only get to vote
      // everyone votes
    }
  }

  // Jason: get a list of players who are alive
  getPlayerList() {
    if (this.getAction() === "kill") {
      // werewolf has to konw her teammate(s)
      // return a SPECIAL list that has her teammate(s)
    } else {
      // eveyone get a REGULAR list that does not disclose play roles
    }
  }
};
