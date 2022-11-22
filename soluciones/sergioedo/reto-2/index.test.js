import { expect, test } from 'vitest'
import { findValidLocation, findValidLocations, findPairCombinations, getStringsBySplit, validPair } from 'index'

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
    expect(validPair('93.0,0,3.5')).toBe(false)
    expect(validPair('3.0,183.5')).toBe(false)
    expect(validPair('90.0,180.0')).toBe(true)
})

test('Test valid combinations', () => {
    const input = '{2035}'
    const expectedOutput = ['{2.0,3.5}', '{-2.0,3.5}', '{2.0,-3.5}', '{-2.0,-3.5}']

    const result = findValidLocations(input)
    expect(JSON.stringify(result.sort())).toBe(JSON.stringify(expectedOutput.sort()))
})

test('Test challenge solution', async () => {
    const input = '{3311014444}'
    const expectedOutput = '{-33.110,144.44}'

    const result = await findValidLocation(input)
    expect(result).toBe(expectedOutput)
}, 60000)