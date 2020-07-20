import { randomNum } from './Player'
import Potion from './Potion'

export default class Enemy {
    constructor(name, weapon) {
        this.name = name
        this.weapon = weapon
        this.potion = new Potion()
        this.health = randomNum(10) + 85
        this.agility = randomNum(5) + 5
        this.strength = randomNum(5) + 5
    }
}

Enemy.prototype.isAlive = function () {
    return this.health > 0 ? true : false
}
Enemy.prototype.getHealth = function () {
    return `The ${this.name}'s health is now ${this.health}!`
}

Enemy.prototype.getAttackValue = function () {
    const min = this.strength - 5
    const max = this.strength + 5

    return randomNum(max - min) + min
}

Enemy.prototype.reduceHealth = function (health) {
    this.health -= health

    if (this.health < 0) {
        this.health = 0
    }
}

Enemy.prototype.getDescription = function () {
    return `A ${this.name} holding a ${this.weapon} has appeared!`
}
