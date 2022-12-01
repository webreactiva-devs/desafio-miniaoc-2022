package main

type CheatSheet struct {
	char   string
	coords []string
}

type CheckCharResponse struct {
	char    string
	isFinal bool
}

func searchForUrlCode(startUrl string) string {
	var result CheckCharResponse
	startString := "3"
	for !result.isFinal {
		for i := 0; i < len(cs); i++ {
			result = checkChar(cs[i], startUrl+startString)

			if result.isFinal {
				startString = startString + result.char
				break
			}

			if result.char != "" {
				startString = startString + result.char
				break
			}
		}
	}

	return startString
}

func checkChar(charCoords CheatSheet, url string) CheckCharResponse {
	for i := 0; i < len(charCoords.coords); i++ {
		jsonData := []byte("{ \"checkpoint\": \"" + charCoords.coords[i] + "\"}")
		resp := postJSONData(url, jsonData)

		if resp.forcedChar != "" {
			return CheckCharResponse{char: resp.forcedChar, isFinal: false}
		}

		if resp.isFinal {
			return CheckCharResponse{char: resp.forcedChar, isFinal: true}
		}

		if !resp.painted {
			return CheckCharResponse{char: "", isFinal: false}
		}

	}

	return CheckCharResponse{char: charCoords.char, isFinal: false}
}

var cs = []CheatSheet{
	{
		char:   "2",
		coords: []string{"{5,5}"},
	},
	{
		char:   "5",
		coords: []string{"{1,5}"},
	},
	{
		char:   "1",
		coords: []string{"{3,5}"},
	},
	{
		char:   "8",
		coords: []string{"{1,0}", "{1,3}", "{1,6}", "{0,1}"},
	},
	{
		char:   "6",
		coords: []string{"{0,5}", "{1,3}", "{1,0}"},
	},
	{
		char:   "3",
		coords: []string{"{1,0}", "{1,3}"},
	},
	{
		char:   "0",
		coords: []string{"{1,0}", "{6,5}"},
	},
	{
		char:   "C",
		coords: []string{"{0,1}", "{1,0}"},
	},
	{
		char:   "A",
		coords: []string{"{0,1}", "{6,1}"},
	},
	{
		char:   "P",
		coords: []string{"{0,1}", "{3,3}"},
	},
	{
		char:   "9",
		coords: []string{"{1,6}", "{3,3}"},
	},
	{
		char:   "4",
		coords: []string{"{3,3}"},
	},
	{
		char:   "7",
		coords: []string{},
	},
}
