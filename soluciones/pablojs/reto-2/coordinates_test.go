package main

import (
	"testing"
)

var decomposeCoordinatePart_BulkData = []struct {
	coord    string
	expected CoordinateValue
	err      bool
}{
	{"23.54", CoordinateValue{"23", "54"}, false},
	{"119.20", CoordinateValue{"119", "20"}, false},
	{"23", CoordinateValue{"", ""}, true},
	{"17.", CoordinateValue{"", ""}, true},
	{".85", CoordinateValue{"", ""}, true},
}

func TestDecomposeCoordinatePart(t *testing.T) {
	for _, tt := range decomposeCoordinatePart_BulkData {
		got, err := decomposeCoordinatePart(tt.coord)
		if got != tt.expected {
			t.Errorf("Expected: %v, got %v", tt.expected, got)
		} else {
			if (err != nil) != tt.err {
				t.Errorf("Expected Error: %v, got %v", tt.err, err)
			}
		}
	}
}

var isValidLatitude_BulkData = []struct {
	coord    string
	expected bool
}{
	{"23.54", true},
	{"86.1", true},
	{"119.20", false},
	{"215.14", false},
	{"017.56", false},
	{"25.", false},
	{"331101.44", false},
}

func TestIsValidLatitude(t *testing.T) {
	for _, tt := range isValidLatitude_BulkData {
		got := isValidLatitude(tt.coord)
		if got != tt.expected {
			t.Errorf("Data: %v -> Expected: %v, got %v", tt.coord, tt.expected, got)
		}
	}
}

var isValidLongitude_BulkData = []struct {
	coord    string
	expected bool
}{
	{"12.386", true},
	{"1.18", true},
	{"105.26", true},
	{"235.58", false},
	{"065.21", false},
	{"98.", false},
	{"331101.44", false},
	{"0.15", false},
}

func TestIsValidLongitude(t *testing.T) {
	for _, tt := range isValidLongitude_BulkData {
		got := isValidLongitude(tt.coord)
		if got != tt.expected {
			t.Errorf("Data: %v -> Expected: %v, got %v", tt.coord, tt.expected, got)
		}
	}
}
