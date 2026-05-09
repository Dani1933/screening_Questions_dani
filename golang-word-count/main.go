package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	input := "Four, One two two three Three three four  four   four"
	
	reg := regexp.MustCompile(`[^a-zA-Z\s]+`)
	cleaned := reg.ReplaceAllString(strings.ToLower(input), "")
	words := strings.Fields(cleaned)

	freq := make(map[string]int)
	for _, word := range words {
		freq[word]++
	}

	for word, count := range freq {
		fmt.Printf("%s => %d\n", word, count)
	}
}