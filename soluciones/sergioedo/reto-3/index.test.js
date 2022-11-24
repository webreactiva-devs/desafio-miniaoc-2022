import { expect, test } from 'vitest'
import { grid2Char } from 'index'

test('Test grid conversion to character A', () => {
    const input = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
    ]
    const expectedOutput = 'A'

    expect(grid2Char(input)).toBe(expectedOutput)
})

test('Test grid conversion to character 1', () => {
    const input = [
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
    ]
    const expectedOutput = '1'

    expect(grid2Char(input)).toBe(expectedOutput)
})

test('Test find character from API with value 3', () => {
    const API_ENDPOINT = 'https://donde-esta-supercoco.vercel.app/api/reto/'
    const input = 3
    const expectedOutput = ''

    expect(findCharacter(API_ENDPOINT, input)).toBe(expectedOutput)
})