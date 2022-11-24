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