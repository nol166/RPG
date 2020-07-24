const { Player } = require('./Player')
const Enemy = require('./Enemy')
const { prompt } = require('inquirer')

module.exports = class Game {
    constructor() {
        this.roundNumber = 0
        this.isPlayerTurn = false
        this.enemies = []
        this.currentEnemy
        this.player
    }

    initializeGame() {
        this.enemies.push(new Enemy('goblin', 'sword'))
        this.enemies.push(new Enemy('orc', 'baseball bat'))
        this.enemies.push(new Enemy('skeleton', 'axe'))
        this.currentEnemy = this.enemies[0]

        prompt({
            type: 'text',
            name: 'name',
            questions: ['what is your name?'],
        }).then(({ name }) => {
            this.player = new Player(name)
            this.startNewBattle()
        })
    }
}
