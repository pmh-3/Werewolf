"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Game(code) {
    _classCallCheck(this, Game);

    this.code = this.generateRoom(3);
    this.players = [];
    this.voteCount = 0;
    this.gameState = "lounge";
    this.playerRolesAndActions = {
      "wolf": "kill",
      "villager": "vote",
      "healer": "heal",
      "seer": "see",
      "spectator": "watch"
    }; // Default case of 3 players 

    this.assignedRole = {
      wolf: 1,
      villager: 1,
      healer: 1,
      seer: 0
    };
  }

  _createClass(Game, [{
    key: "getRoomCode",
    value: function getRoomCode() {
      return this.code;
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(player) {
      this.players.push(player);
    }
  }, {
    key: "removePlayer",
    value: function removePlayer(player) {
      this.players = this.players.filter(function (p) {
        return p.id !== player.id;
      });
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this.players;
    }
  }, {
    key: "getPlayer",
    value: function getPlayer(index) {
      return this.players[index];
    }
  }, {
    key: "isAllVotesIn",
    value: function isAllVotesIn() {
      if (this.voteCount >= this.players.length) {
        console.log('all votes in');
        return true;
      }

      return false;
    } // GameState can be:
    // lounge, night,day
    // for night& day, special its # as well
    // if # is needed for lounge, assign it 0

  }, {
    key: "getState",
    value: function getState() {
      return this.gameState;
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.gameState = state;
      this.voteCount = 0; //clear votes

      this.players.forEach(function (player) {
        player.clearVotes();
      });
    }
  }, {
    key: "getRoom",
    value: function getRoom() {
      return {
        code: this.code,
        players: this.players,
        gameState: this.gameState
      };
    } // according to total # of players, assign them a role

  }, {
    key: "assignPlayerRolesAndActions",
    value: function assignPlayerRolesAndActions() {
      var _this = this;

      var playerCount = this.players.length; // role assignment generation based on total # of players

      if (playerCount > 3) {
        var val = playerCount / 10 == 1 ? playerCount / 10 + 0.1 : playerCount / 10;
        console.log(val);
        assignedRole.wolf += Math.ceil(val);
        assignedRole.healer += Math.floor(val);
        assignedRole.seer = Math.ceil(val);
        assignedRole.villager = playerCount - (assignedRole.wolf + assignedRole.seer + assignedRole.healer);
      } // shuffle the current players to allow random assignment of roles


      var shuffledPlayers = this.getPlayers().sort(function () {
        return 0.5 - Math.random();
      }); // assign roles to players

      shuffledPlayers.forEach(function (player) {
        // get the available roles for the player
        var availableRoles = Object.keys(_this.assignedRole).filter(function (role) {
          return _this.assignedRole[role] > 0;
        }); // assign a role to the player

        player.role = availableRoles[Math.floor(Math.random() * availableRoles.length)]; // reduce the assigned role by 1

        _this.assignedRole[player.role]--;
      }); // Assiciate actions to players based on their role

      shuffledPlayers.forEach(function (player) {
        player.action = _this.playerRolesAndActions[player.role];
      });
    }
  }, {
    key: "generateRoom",
    value: function generateRoom(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return result;
    }
  }, {
    key: "Vote",
    value: function Vote(targetName, cmd) {
      this.voteCount++;
      this.players.forEach(function (player) {
        if (player.name == targetName) {
          if (cmd == "add") {
            player.addVote();
            console.log('adding vote to ', player.name);
          } else if (cmd == 'delete') {
            player.deleteVote();
          }
        }
      });
    }
  }, {
    key: "countVote",
    value: function countVote(state) {
      var _this2 = this;

      console.log('counting votes');

      if (state == 'sunrise') {
        this.players.forEach(function (p) {
          console.log(p.name, ' has ', p.vote);

          if (p.vote == _this2.assignedRole.werewolf) {
            p.role = _this2.assignedRole.spectator;
            return p;
          }
        });
        return null;
      } else if (state == 'sunset') {
        //find player with most votes
        var banished = this.players[0];
        this.players.forEach(function (p) {
          console.log(p.name, ' has ', p.vote);

          if (p.vote > banished.vote) {
            banished = p;
          }
        }); //find and account for tie 

        this.players.forEach(function (p) {
          //compare player with most votes to everyone else but themselves
          if (p.vote == banished.vote && p != banished) {
            console.log("tie in banishment"); //decide tie with coin toss either 0 or 1

            if (Math.floor(Math.random() * 2)) {
              banished = p;
            }
          }
        });
        banished = this.assignedRole.spectator;
        return banished;
      }
    }
  }]);

  return Game;
}();