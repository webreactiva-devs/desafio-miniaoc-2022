package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type CocoResponse struct {
	Status     bool   `json:"status"`
	Success    bool   `json:"success"`
	Message    string `json:"message"`
	AlgoParaTi string `json:"algo_para_ti"`
}

func main() {

	httpposturl := "https://donde-esta-supercoco.vercel.app/api/reto/"

	ruta := searchForUrlCode(httpposturl)

	fmt.Println("COCO encontrado en: " + httpposturl + ruta)
	fmt.Println("Pulsa [ENTER] para finalizar.")

	reader := bufio.NewReader(os.Stdin)
	text, _ := reader.ReadString('\n')
	text = strings.Replace(text, "\n", "", -1)
}
