package main

import (
	"errors"
	"strconv"
	"strings"
)

type Coordinate struct {
	lat, lng string
}

type CoordinateValue struct {
	integerPart, decimalPart string
}

func isValidCoordinate(coord Coordinate) bool {
	if isValidLatitude(coord.lat) && isValidLongitude(coord.lng) {
		return true
	} else {
		return false
	}
}

func isValidLatitude(lat string) bool {
	latitude, err := decomposeCoordinatePart(lat)

	if err != nil {
		return false
	}

	if latitude.integerPart[0] == '0' {
		return false
	}
	if len(latitude.decimalPart) <= 0 || len(latitude.integerPart) <= 0 {
		return false
	}

	intPart, err := strconv.Atoi(latitude.integerPart)

	if intPart > 0 && intPart <= 90 && err == nil {
		return true
	}

	return false
}

func isValidLongitude(lng string) bool {
	longitude, err := decomposeCoordinatePart(lng)

	if err != nil {
		return false
	}

	if longitude.integerPart[0] == '0' {
		return false
	}
	if len(longitude.decimalPart) <= 0 || len(longitude.integerPart) <= 0 {
		return false
	}

	intPart, err := strconv.Atoi(longitude.integerPart)

	if intPart > 0 && intPart <= 180 && err == nil {
		return true
	}
	return false
}

func decomposeCoordinatePart(data string) (CoordinateValue, error) {
	var coordValue CoordinateValue
	res := strings.Split(data, ".")

	if len(res) != 2 {
		return coordValue, errors.New("Invalid coord part")
	}
	if res[0] == "" || res[1] == "" {
		return coordValue, errors.New("Invalid coord part")
	}

	coordValue.integerPart = res[0]
	coordValue.decimalPart = res[1]

	return coordValue, nil
}
