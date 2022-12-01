package main

import (
	"strings"
)

func getValidCoordsFromSignal(signal string) []Coordinate {
	var result []Coordinate
	possibleCoords := getPossibleCoordsFromSignal(signal)

	for i := 0; i < len(possibleCoords); i++ {
		coord := possibleCoords[i]

		if isValidCoordinate(coord) {
			result = append(result, coord)

			var altCoord Coordinate
			altCoord.lat = "-" + coord.lat
			altCoord.lng = coord.lng
			result = append(result, altCoord)

			altCoord.lat = coord.lat
			altCoord.lng = "-" + coord.lng
			result = append(result, altCoord)

			altCoord.lat = "-" + coord.lat
			altCoord.lng = "-" + coord.lng
			result = append(result, altCoord)
		}
	}

	return result
}

func getPossibleCoordsFromSignal(signal string) []Coordinate {
	var result []Coordinate

	cleanSignal := strings.ReplaceAll(strings.ReplaceAll(signal, "{", ""), "}", "")

	for i := 0; i < len(cleanSignal)-3; i++ {
		separatorPos := i + 1
		posibLat := cleanSignal[:separatorPos+1]
		posibLng := cleanSignal[separatorPos+1:]

		for j := 0; j < len(posibLat)-1; j++ {
			intLatPartPos := j + 1
			intLatPart := posibLat[:intLatPartPos]
			decLarPart := posibLat[intLatPartPos:]

			for h := 0; h < len(posibLng)-1; h++ {
				intLngPartPos := h + 1
				intLngPart := posibLng[:intLngPartPos]
				decLngPart := posibLng[intLngPartPos:]

				var coord Coordinate
				coord.lat = intLatPart + "." + decLarPart
				coord.lng = intLngPart + "." + decLngPart

				result = append(result, coord)
			}
		}
	}
	return result
}
