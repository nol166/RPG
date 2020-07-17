import Potion from '../lib/Potion'
export default class Player {
    constructor(name = '') {
        this.name = name
        this.inventory = [new Potion('health'), new Potion()]
        this.health = Math.floor(Math.random() * 10 + 95)
        this.strength = Math.floor(Math.random() * 5 + 7)
        this.agility = Math.floor(Math.random() * 5 + 7)
    }
}

/* get stats */
Player.prototype.getStats = function () {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility,
    }
}

/* get inventory*/
Player.prototype.getInventory = function () {
    this.inventory.length ? this.inventory : false
}

/* get health*/
Player.prototype.getHealth = function () {
    return `${this.name}' health is now ${this.health}`
}

/* is alive */
Player.prototype.isAlive = function () {
    this.health === 0 ? true : false
}

/* reduce health
    ? make sure health doesn't drop below 0
*/
Player.prototype.reduceHealth = function (amount) {
    this.health -= amount
    if (this.health < 0) {
        this.health = 0
    }
}
