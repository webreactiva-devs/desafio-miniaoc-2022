package main

import (
	"fmt"
)

type CocoResponse struct {
	Status            string `json:"status"`
	MessageToTelegram string `json:"message_to_telegram"`
	SupercocoIsHere   string `json:"supercoco_is_here"`
}

func main() {
	signal := "{3311014444}"

	coords := getValidCoordsFromSignal(signal)

	coord, err := checkCoords(coords)

	if err != nil {
		fmt.Println("Coco not found")
	} else {
		fmt.Println("WE GOT COCO!! he is in: " + coord.lat + "," + coord.lng)
	}

}
