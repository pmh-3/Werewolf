module.exports = class Game {
  constructor(code) {
    this.code = this.generateRoom(3);
    this.players = [];
    this.gameState = "lounge";
    this.playerRolesAndActions = {
      "wolf": "kill",
      "villager": "vote",
      "healer": "heal",
      "seer": "see",
      "spectator": "watch"
    }
    // Default case of 3 players 
    this.assignedRole = {
      wolf: 1,
      villager: 1,
      healer: 1,
      seer: 0,
    };
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
  getState(){
    return this.gameState;
  }

  setState(state){
    this.gameState = state;
    //clear votes
    this.players.forEach(player => {
        player.clearVotes();
    });
  }

  getRoom() {
    return {
      code: this.code,
      players: this.players,
      gameState: this.gameState,
    };
  }

  // according to total # of players, assign them a role
  assignPlayerRolesAndActions() {
    let playerCount = this.players.length;
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
      let availableRoles = Object.keys(this.assignedRole).filter(
        (role) => this.assignedRole[role] > 0
      );
      // assign a role to the player
      player.role =
        availableRoles[Math.floor(Math.random() * availableRoles.length)];
      // reduce the assigned role by 1
      this.assignedRole[player.role]--;
    });
    
    // Assiciate actions to players based on their role
    shuffledPlayers.forEach((player) => {
      player.action = this.playerRolesAndActions[player.role];
    });
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

  Vote(p, cmd){
    this.players.forEach(player => {
        if(player == p){
          if(cmd == "add"){
            player.addVote();
          }else if(cmd == 'delete'){
            player.deleteVote();
          }
        }
    });
  }

  countVote(state){
    console.log('counting votes');
    if(state == 'sunrise'){
      this.players.forEach(p =>{
        if(p.vote == this.assignedRole.werewolf){
          p.role = this.assignedRole.spectator
          return p;
        }
      })
      return null;
    }else if(state == 'sunset'){
      //find player with most votes
      let banished = this.players[0]; 
      this.players.forEach(p =>{
        if(p.vote > banished.vote){ 
          banished = p;
        }
      })

      //find and account for tie 
      this.players.forEach(p =>{
        //compare player with most votes to everyone else but themselves
        if(p.vote == banished.vote && p != banished){ 
          //decide tie with coin toss either 0 or 1
          if(Math.floor(Math.random()*2)){
            banished = p
          }
        }
      })
      return banished;
    }
  }

  //Utility
  Clock(time){
    setInterval(function(){
      time--;
      if(time == 0){
        return "times up";
      }
    }, 1000);
  }
};
