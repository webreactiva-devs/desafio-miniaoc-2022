import { expect, test } from 'vitest'
import { findValidLocations, findPairCombinations, getStringsBySplit, validPair } from 'index'

test('Test string combinations splitting by char', () => {
    const input = 'abcd'
    const separator = '#'
    const expectedOutput = ['a#bcd', 'ab#cd', 'abc#d']

    const result = getStringsBySplit(input, separator)
    expect(JSON.stringify(result.sort())).toBe(JSON.stringify(expectedOutput.sort()))
})

test('Test pair combinations', () => {
    const input = '2035'
    const expectedOutput = ['2,0.35', '2,03.5', '2,035', '2.0,3.5', '2.0,35', '2.03,5', '20,3.5', '20,35', '20.3,5', '203,5']

    const result = findPairCombinations(input)
    expect(JSON.stringify(result.sort())).toBe(JSON.stringify(expectedOutput.sort()))
})

test('Test valid pairs', () => {
    expect(validPair('2.0,3.5')).toBe(true)
    expect(validPair('02,3.5')).toBe(false)
    expect(validPair('2,03.5')).toBe(false)
    expect(validPair('2,3.5')).toBe(false)
})

test('Test valid combinations', () => {
    const input = '{2035}'
    const expectedOutput = ['{2.0,3.5}', '{-2.0,3.5}', '{2.0,-3.5}', '{-2.0,-3.5}']

    const result = findValidLocations(input)
    expect(JSON.stringify(result.sort())).toBe(JSON.stringify(expectedOutput.sort()))
})