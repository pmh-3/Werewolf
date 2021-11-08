module.exports = class Player{
    constructor(name){
        this.name = name;
        this.role = null;
    }

    asignRole(role){
        this.role = role;
    }
}
