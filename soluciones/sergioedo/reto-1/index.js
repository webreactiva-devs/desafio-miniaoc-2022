export const caesarCypher = (input, shift) => {
    if (shift === 0) return input
    return input.split('').map(char => {
        if (char === ' ') return char
        return String.fromCharCode(char.charCodeAt(0) + shift)
    }).join('')
}