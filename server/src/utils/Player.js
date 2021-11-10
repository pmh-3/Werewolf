module.exports = class Player {
  constructor(name, socketId) {
    this.name = name;
    this.socketId = socketId;
    this.role = null;
    this.action = null;
    this.roles = ["werewolf", "seer", "healer", "villager"];
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
};
