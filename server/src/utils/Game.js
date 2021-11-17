module.exports = class Game {
  constructor(code) {
    this.code = this.generateRoom(3);
    this.players = [];
    this.voteCount = 0;
    this.gameState = "lounge";
    //stores saved player
    this.saved = null;
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

  isAllVotesIn(){
    if(this.voteCount >= this.players.length){
      console.log('all votes in');
      return true;
    }
    return false;
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

  }

  resetVotes(){
    this.voteCount = 0;
    this.saved = null;
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
      this.assignedRole.wolf += Math.ceil(val);
      this.assignedRole.healer += Math.floor(val);
      this.assignedRole.seer = Math.ceil(val);
      this.assignedRole.villager =
        playerCount -
        (this.assignedRole.wolf + this.assignedRole.seer + this.assignedRole.healer);
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

  Vote(targetName, cmd){
    this.voteCount++
    this.players.forEach(player => {
        if(player.name == targetName){
          if(cmd == "add"){
            player.addVote();
            console.log('adding vote to ', player.name);
          }else if(cmd == 'delete'){
            player.deleteVote();
            this.saved = player;
          }
        }
    });
  }

  countVote(state){
    console.log('counting votes');

    //Return nobody if everyone was saved
    let nobody = null;

    if(state == 'sunrise'){
      this.players.forEach(p =>{
        console.log(p.name, ' has ', p.vote)
        if(p.vote == this.assignedRole.werewolf){
          p.role = this.assignedRole.spectator
          return p;
        }
      })
      return nobody;
    }else if(state == 'sunset'){
      //find player with most votes
      let banished = this.players[0];
      this.players.forEach(p =>{
        console.log(p.name, ' has ', p.vote)
        //must have at least one vote
        if(p.vote >= 1 && p.vote > banished.vote){ 
          banished = p;
        }
      })

      //find and account for tie 
      this.players.forEach(p =>{
        //compare player with most votes to everyone else but themselves
        if(p.vote == banished.vote && p != banished && p.vote >= 1){ 
          console.log("tie in banishment")
          //decide tie with coin toss either 0 or 1
          if(Math.floor(Math.random()*2)){
            banished = p
          }
        }
      })

      if(banished.votes >= 1){
        banished = this.assignedRole.spectator;
        return banished;
      }else{
        return null;
      }
    }
  }

 
};
