export const getStringsBySplit = (input, separator) => {
    const result = []
    for (let i = 1; i < input.length; i++) {
        result.push(input.substring(0, i) + separator + input.substring(i))
    }
    return result
}

const getLatLon = (pair) => {
    const lat = pair.split(',')[0]
    const lon = pair.split(',')[1]
    return { lat, lon }
}

export const findPairCombinations = (input) => {
    const result = getStringsBySplit(input, ',')
    return result.map(pair => {
        const { lat, lon } = getLatLon(pair)
        const lats = [lat, ...getStringsBySplit(lat, '.')]
        const lons = [lon, ...getStringsBySplit(lon, '.')]
        return lats.map(lat => lons.map(lon => `${lat},${lon}`)).flat()
    }).flat()
}

export const validPair = (pair) => {
    const { lat, lon } = getLatLon(pair)
    if (lat[0] === '0' || lon[0] === '0') return false
    if (lat.indexOf('.') < 0 || lon.indexOf('.') < 0) return false
    return true
}

export const multiplyWithSign = (combinations) => {
    return combinations.map(combination => {
        const { lat, lon } = getLatLon(combination)
        return [`${lat},${lon}`, `-${lat},${lon}`, `${lat},-${lon}`, `-${lat},-${lon}`]
    })
}

export const findValidLocations = (input) => {
    const digits = input.replace('{', '').replace('}', '')

    return multiplyWithSign(findPairCombinations(digits).filter(validPair)).flat()
        .map(combination => `{${combination}}`)
}