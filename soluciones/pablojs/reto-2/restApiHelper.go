package main

import (
	"bytes"
	"io/ioutil"
	"net/http"
)

func postJSONData(url string, jsonData []byte) []byte {

	request, error := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	response, error := client.Do(request)
	if error != nil {
		panic(error)
	}
	defer response.Body.Close()

	body, _ := ioutil.ReadAll(response.Body)

	return body
}
