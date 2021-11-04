module.exports = {
   Game : class Game {
        constructor(code){
            this.code = code;
            this.players = [];
            this.state = "lounge";
        }

        addPlayer(name){
            let player = new Player(name);
            this.players.add(player);
        }
    },

   Player : class Player {
        constructor(name){
            this.name = name;
            this.role = null;
        }

        asignRole(role){
            this.role = role;
        }
    }

}