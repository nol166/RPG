const { Player } = require('./Player')
const Enemy = require('./Enemy')
const { prompt } = require('inquirer')
const playerPrompts = require('./prompts/playerPrompts')

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

    startNewBattle() {
        this.isPlayerTurn =
            this.player.agility > this.currentEnemy.agility ? true : false

        console.log('Your stats are as follows:')
        console.table(this.player.getStats())
        console.log(this.currentEnemy.getDescription())
        this.battle()
    }

    battle() {
        if (this.isPlayerTurn) {
            prompt(playerPrompts).then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("you don't have any potions")
                        return this.checkEndOfBattle()
                    }
                    prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player
                            .getInventory()
                            .map((item, i) => `${i + 1}: ${item.name}`),
                    }).then(({ action }) => {
                        const potionDetails = action.split(': ')

                        this.player.usePotion(potionDetails[0] - 1)
                        console.log(`You used a ${potionDetails[1]} potion.`)
                        this.checkEndOfBattle()
                    })
                } else {
                    const damage = this.player.getAttackValue()
                    this.currentEnemy.reduceHealth(damage)

                    console.log(`You attacked the ${this.currentEnemy.name}`)
                    console.log(this.currentEnemy.getHealth())
                    this.checkEndOfBattle()
                }
            })
        } else {
            const damage = this.currentEnemy.getAttackValue()
            this.player.reduceHealth(damage)

            console.log(`You were attacked by the ${this.currentEnemy.name}`)
            console.log(this.player.getHealth())
            this.checkEndOfBattle()
        }
    }

    checkEndOfBattle() {
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn
            this.battle()
        } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`)

            this.player.addPotion(this.currentEnemy.potion)
            console.log(
                `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
            )

            this.roundNumber++

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber]
                this.startNewBattle()
            } else {
                console.log('You win!')
            }
        } else {
            console.log("You've been defeated!")
        }
    }
}
