package main

import (
	"fmt"
	"strings"
)

func getValidCoordsFromSignal(signal string) []string {
	var result []string

	cleanSignal := strings.ReplaceAll(strings.ReplaceAll(signal, "{", ""), "}", "")

	for i := 0; i < len(cleanSignal)-1; i++ {
		separatorPos := i + 1
		posibLat := cleanSignal[:separatorPos]
		posibLng := cleanSignal[separatorPos:]

		coord := "{" + posibLat + "," + posibLng + "}"
		result = append(result, coord)
		fmt.Println(result[i])
	}

	return result
}
