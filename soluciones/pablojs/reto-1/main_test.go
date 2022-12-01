package main

import (
	"testing"
)

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var getCharWithDisplacement_BulkData = []struct {
	initialPosition int
	displacement    int
	expected        string
}{
	{2, 6, "I"},
	{24, 5, "D"},
	{9, -2, "H"},
	{1, -4, "X"},
}

func TestGetCharWithDisplacement(t *testing.T) {
	for _, tt := range getCharWithDisplacement_BulkData {
		got := getCharWithDisplacement(tt.initialPosition, tt.displacement, alphabet)
		if got != tt.expected {
			t.Errorf("Expected: %v, got %v", tt.expected, got)
		}
	}
}

var getCharacterPosition_BulkData = []struct {
	char     string
	expected int
}{
	{"A", 0},
	{"L", 11},
	{"5", -1},
	{" ", -1},
}

func TestGetCharacterPosition(t *testing.T) {
	for _, tt := range getCharacterPosition_BulkData {
		got := getCharacterPosition(tt.char, alphabet)
		if got != tt.expected {
			t.Errorf("Expected: %v, got %v", tt.expected, got)
		}
	}
}

var decrypt_BulkData = []struct {
	texto        string
	displacement int
	expected     string
}{
	{"ELIX", 3, "HOLA"},
	{"NVI EPVI YZ BVUOZGPBVOSZ", 5, "SAN JUAN DE GAZTELUGATXE"},
	{"HVGVIYMDIZM", 5, "MALANDRINER"},
}

func TestDecrypt(t *testing.T) {
	for _, tt := range decrypt_BulkData {
		got := decrypt(tt.texto, alphabet, tt.displacement)
		if got != tt.expected {
			t.Errorf("Expected: %v, got %v", tt.expected, got)
		}
	}
}
