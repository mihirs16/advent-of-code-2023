package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func readData(filename string) ([]int, []int) {
	rawData, err := os.ReadFile(filename)
	checkError(err)
	data := strings.Split(string(rawData), "\n")
	rawTimes := regexp.MustCompile(`\d+`).FindAllString(data[0], -1)
	rawDistances := regexp.MustCompile(`\d+`).FindAllString(data[1], -1)

	times := []int{}
	distances := []int{}
	for i, _ := range rawTimes {
		time, err := strconv.Atoi(rawTimes[i])
		checkError(err)
		times = append(times, time)

		distance, err := strconv.Atoi(rawDistances[i])
		checkError(err)
		distances = append(distances, distance)
	}

	fmt.Println(times)
	fmt.Println(distances)

	return distances, times
}

func readDataWOKerning(filename string) (int, int) {
	rawData, err := os.ReadFile(filename)
	checkError(err)
	data := strings.Split(string(rawData), "\n")
	rawTimes := regexp.MustCompile(`\d+`).FindAllString(data[0], -1)
	rawDistances := regexp.MustCompile(`\d+`).FindAllString(data[1], -1)

	rawTime := strings.Join(rawTimes, "")
	rawDistance := strings.Join(rawDistances, "")

	time, err := strconv.Atoi(rawTime)
	checkError(err)
	distance, err := strconv.Atoi(rawDistance)
	checkError(err)

	return distance, time
}
