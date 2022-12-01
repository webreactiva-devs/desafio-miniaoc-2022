package main

import (
	"strings"
)

func getCharacterPosition(char string, alphabet string) int {
	for i := 0; i < len(alphabet); i++ {
		if char == string(alphabet[i]) {
			return i
		}
	}
	return -1
}

func getCharWithDisplacement(initialPosition int, displacement int, alphabet string) string {
	position := initialPosition + displacement
	if position > len(alphabet)-1 {
		position = position - len(alphabet)
	}
	if position < 0 {
		position = len(alphabet) + position
	}
	return string(alphabet[position])
}

func decrypt(text string, alphabet string, displacement int) string {
	upperText := strings.ToUpper(text)

	response := ""

	for i := 0; i < len(upperText); i++ {
		char := string(upperText[i])

		foundIn := getCharacterPosition(char, alphabet)
		if foundIn > -1 {
			response = response + getCharWithDisplacement(foundIn, displacement, alphabet)

		} else {
			response = response + char
		}
	}

	return response
}

func main() {
	alphabet := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	encriptedText := "NVI EPVI YZ BVUOZGPBVOSZ"
	displacement := 5

	result := decrypt(encriptedText, alphabet, displacement)

	println(result)

}
