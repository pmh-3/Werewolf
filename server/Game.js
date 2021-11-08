var Player = require('./Player');
module.exports =  class Game {
        constructor(code){
            this.code = code;
            this.players = [];
            this.state = "lounge";
        }

        addPlayer(name){
            let player = new Player(name);
            this.players.push(player);
        }
    }
