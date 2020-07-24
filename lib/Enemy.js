const { randomNum } = require('./Player')
const Potion = require('./Potion')

// * Generally all the methods here are the same as player with a few exceptions
module.exports = class Enemy {
    constructor(name, weapon) {
        this.name = name
        this.weapon = weapon
        this.potion = new Potion()
        this.health = randomNum(10) + 85
        this.agility = randomNum(5) + 5
        this.strength = randomNum(5) + 5
    }
    isAlive() {
        return this.health > 0 ? true : false
    }
    getHealth() {
        return `The ${this.name}'s health is now ${this.health}!`
    }

    getAttackValue() {
        const min = this.strength - 5
        const max = this.strength + 5

        return randomNum(max - min) + min
    }

    reduceHealth(health) {
        this.health -= health
        this.health = this.health < 0 ? (this.health = 0) : this.health
    }

    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`
    }
}
