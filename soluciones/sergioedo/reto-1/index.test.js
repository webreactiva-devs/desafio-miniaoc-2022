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

test('caesar cypher method with spaces - must mantain them', () => {
    const input = 'ABC ABC'
    const shift = 3
    const expectedOutput = 'DEF DEF'
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})

test('caesar cypher method with shift 5 (Ned Stark sons) - find solution', () => {
    const input = 'NVI EPVI YZ BVUOZGPBVOSZ'
    const shift = 5
    const expectedOutput = ''
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})