package main

import (
	"encoding/json"
	"errors"
)

func checkCoords(coords []Coordinate) (Coordinate, error) {
	var emptyCoordinate Coordinate

	for i := 0; i < len(coords); i++ {

		httpposturl := "https://donde-esta-supercoco.vercel.app/api/reto/2"

		coordsToCheck := "{" + coords[i].lat + "," + coords[i].lng + "}"

		var jsonData = []byte(`{
			"solution": "` + coordsToCheck + `" 
		}`)

		response := postJSONData(httpposturl, jsonData)
		var result CocoResponse
		if err := json.Unmarshal(response, &result); err != nil { // Parse []byte to go struct pointer
			return emptyCoordinate, errors.New("Can not unmarshal JSON")
		}

		statusOK := "¡No te puedo creer! ¡Has pillado a SuperCoco!"

		if result.Status == statusOK {
			return coords[i], nil
		}
	}

	return emptyCoordinate, errors.New("Coco not found")
}
