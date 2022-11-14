import { expect, test } from 'vitest'
import { caesarCypher } from 'index'

test('caesar cypher method with shift 0 must return input value', () => {
    const input = 'ABC'
    const shift = 0
    const expectedOutput = input
    expect(caesarCypher(input, shift)).toBe(expectedOutput)
})
