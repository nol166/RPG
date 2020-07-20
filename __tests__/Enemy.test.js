import Enemy from '../lib/Enemy'
import Potion from '../lib/Potion'

jest.mock('../lib/Potion.js')

test('creates an enemy object', () => {
    const enemy = new Enemy('ct', 'm4')

    expect(enemy.name).toBe('ct')
    expect(enemy.weapon).toBe('m4')
    expect(enemy.health).toEqual(expect.any(Number))
    expect(enemy.strength).toEqual(expect.any(Number))
    expect(enemy.agility).toEqual(expect.any(Number))
    expect(enemy.potion).toEqual(expect.any(Object))
})

test('enemy alive?', () => {
    const enemy = new Enemy('ct', 'm4')

    expect(enemy.isAlive()).toBeTruthy()
    enemy.health = 0
    expect(enemy.isAlive()).toBeFalsy()
})

test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword')

    expect(enemy.getHealth()).toEqual(
        expect.stringContaining(enemy.health.toString())
    )
})

test('gets enemy attack value', () => {
    const enemy = new Enemy('ct', 'm4')

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5)
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15)
})

test("subtracts from enemy's health", () => {
    const enemy = new Enemy('ct', 'm4')
    const oldHealth = enemy.health

    enemy.reduceHealth(5)
    expect(enemy.health).toBe(oldHealth - 5)

    enemy.reduceHealth(99999)
    expect(enemy.health).toBe(0)
})

test('gets a description of the enemy', () => {
    const enemy = new Enemy('ct', 'm4')

    expect(enemy.getDescription()).toEqual(expect.stringContaining('ct'))
    expect(enemy.getDescription()).toEqual(expect.stringContaining('m4'))
})
