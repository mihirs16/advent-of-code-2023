package main

import "fmt"

func calcNumOfPossibleSpeeds(distance int, time int) int {
	numPossibleSpeeds := 0
	holdButtonFor := 0
	for holdButtonFor <= time {
		distanceTravelledInTime := holdButtonFor * (time - holdButtonFor)
		if distanceTravelledInTime > distance {
			numPossibleSpeeds++
		}
		holdButtonFor++
	}

	return numPossibleSpeeds
}

func main() {
	permutations := 1
	distance, time := readDataWOKerning("input.txt")
	permutations = calcNumOfPossibleSpeeds(distance, time)
	fmt.Println(permutations)
}
