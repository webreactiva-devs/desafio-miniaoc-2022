import fetch from 'node-fetch'

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
    if (Number(lat) > 90 || Number(lon) > 180) return false
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

export const findValidLocation = async (input) => {
    const API_VALIDATION_URL = 'https://donde-esta-supercoco-delineas.vercel.app/api/reto/2'

    const locations = findValidLocations(input)
    const promises = locations.map(async location => {
        const response = await fetch(API_VALIDATION_URL, {
            method: 'POST',
            body: JSON.stringify({
                "solution": location
            })
        });
        const data = await response.json();
        if (data && data.status !== 'Intenténtalo de nuevo, malandriner nunca se rinde') {
            return location
        }
        return null
    })
    const location = await Promise.all(promises)
    return location.filter(location => location !== null)[0]
}