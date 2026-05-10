package main

import (
	"fmt"
	"regexp"
	"sort"
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

	type kv struct {
		k string
		v int
	}
	list := make([]kv, 0, len(freq))
	for k, v := range freq {
		list = append(list, kv{k, v})
	}
	sort.Slice(list, func(i, j int) bool {
		if list[i].v == list[j].v {
			return list[i].k < list[j].k
		}
		return list[i].v > list[j].v
	})
	for _, it := range list {
		fmt.Printf("%s => %d\n", it.k, it.v)
	}
}
