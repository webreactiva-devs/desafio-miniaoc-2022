export const caesarCypher = (input, shift) => {
    if(shift === 0) return input
    return input.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) + 1)
    }).join('')
}