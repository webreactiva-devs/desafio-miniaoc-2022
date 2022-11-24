import { expect, test } from 'vitest'
import { grid2Char, findCharacter } from 'index'

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

const API_ENDPOINT = 'https://donde-esta-supercoco.vercel.app/api/reto/'

test('Test find character from API with value 3', async () => {
    const input = 3
    const expectedOutput = '7'

    const result = await findCharacter(`${API_ENDPOINT}${input}`)
    expect(result).toBe(expectedOutput)
}, 30000)