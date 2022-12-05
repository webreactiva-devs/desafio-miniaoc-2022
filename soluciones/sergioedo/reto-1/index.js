const initialCharCode = 'A'.charCodeAt(0)
const lastCharCode = 'Z'.charCodeAt(0)
const numChars = lastCharCode - initialCharCode + 1

export const caesarCypher = (input, shift) => {
    if (shift === 0) return input
    return input.split('').map(char => {
        if (char === ' ') return char
        const charCode = char.charCodeAt(0)
        const newCharCode = initialCharCode + ((charCode - initialCharCode + shift) % numChars)
        return String.fromCharCode(newCharCode)
    }).join('')
}