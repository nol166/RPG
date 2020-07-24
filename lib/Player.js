const Potion = require('../lib/Potion')
const randomNum = num => Math.floor(Math.random() * num)

class Player {
    constructor(name = '') {
        this.name = name
        this.inventory = [new Potion('health'), new Potion()]
        this.health = randomNum(10) + 95
        this.strength = randomNum(5) + 7
        this.agility = randomNum(5) + 7
    }

    /* get stats */
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility,
        }
    }

    /* get inventory*/
    getInventory() {
        return this.inventory.length ? this.inventory : false
    }

    /* get health*/
    getHealth() {
        return `${this.name}' health is now ${this.health}`
    }

    /* is alive */
    isAlive() {
        return this.health === 0 ? false : true
    }

    /* reduce health
    ? make sure health doesn't drop below 0
*/
    reduceHealth(amount) {
        this.health -= amount
        if (this.health < 0) {
            this.health = 0
        }
    }

    /* get attack value */
    getAttackValue() {
        const min = this.strength - 5
        const max = this.strength + 5

        return randomNum(max - min) + min
    }

    /* add potion */
    addPotion(potion) {
        this.inventory.push(potion)
    }

    /* use potion */
    usePotion(index) {
        console.log(this.getInventory())
        const potion = this.getInventory().splice(index, 1)[0]

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value
                break
            case 'health':
                this.health += potion.value
                break
            case 'strength':
                this.strength += potion.value
                break
        }
    }
}
module.exports = { Player, randomNum }
