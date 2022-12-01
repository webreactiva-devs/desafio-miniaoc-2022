package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
)

type CocoPointResponse struct {
	painted, isFinal, err bool
	forcedChar            string
}

func postJSONData(url string, jsonData []byte) CocoPointResponse {

	request, error := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	response, error := client.Do(request)
	if error != nil {
		return CocoPointResponse{
			painted:    false,
			isFinal:    false,
			forcedChar: "",
			err:        true,
		}
	}
	defer response.Body.Close()

	body, _ := ioutil.ReadAll(response.Body)

	var result CocoResponse
	if err := json.Unmarshal(body, &result); err != nil {

		stringfyBody := string(body[:])

		if strings.Contains(stringfyBody, "anti-hackers") {
			return CocoPointResponse{
				painted:    false,
				isFinal:    false,
				forcedChar: "z",
				err:        false,
			}
		}
		return CocoPointResponse{
			painted:    false,
			isFinal:    false,
			forcedChar: "",
			err:        true,
		}
	}

	if result.Success {
		return CocoPointResponse{
			painted:    false,
			isFinal:    true,
			forcedChar: "",
			err:        false,
		}
	}

	if response.Status == "200 OK" {
		return CocoPointResponse{
			painted:    true,
			isFinal:    false,
			forcedChar: "",
			err:        false,
		}
	}

	return CocoPointResponse{
		painted:    false,
		isFinal:    false,
		forcedChar: "",
		err:        false,
	}
}
