package main

import "fmt"

func main() {
	signal := "{3311014444}"
	// solution := "{-33.110,144.44}"

	coords := getValidCoordsFromSignal(signal)
	for i := 0; i < len(coords); i++ {
		fmt.Println(coords[i].lat + ", " + coords[i].lng)
	}
}
