import { expect, test } from 'vitest'
import { caesarCypher } from 'index'

test('caesar cypher method with shift 0 must return input value', () => {
    const input = 'ABC'
    const shift = 0
    const expectedOutput = input
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})

test('caesar cypher method with shift 1 must return next characters', () => {
    const input = 'ABC'
    const shift = 1
    const expectedOutput = 'BCD'
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})

test('caesar cypher method with shift 3 must return 3-next characters', () => {
    const input = 'ABC'
    const shift = 3
    const expectedOutput = 'DEF'
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})