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
	{"119.20", true},
	{"215.14", true},
	{"017.56", false},
	{"25.", false},
}

func TestIsValidLatitude(t *testing.T) {
	for _, tt := range isValidLatitude_BulkData {
		got := isValidLatitude(tt.coord)
		if got != tt.expected {
			t.Errorf("Data: %v -> Expected: %v, got %v", tt.coord, tt.expected, got)
		}
	}
}
