package main

import "fmt"

func calcNumOfImpossibleSpeeds(distance int, time int) int {
	numImpossibleSpeeds := 0
	holdButtonFor := 0
	for {
		distanceTravelledInTime := holdButtonFor * (time - holdButtonFor)
		if distanceTravelledInTime <= distance {
			numImpossibleSpeeds++
		} else {
			break
		}
		holdButtonFor++
	}

	holdButtonFor = time
	for {
		distanceTravelledInTime := holdButtonFor * (time - holdButtonFor)
		if distanceTravelledInTime <= distance {
			numImpossibleSpeeds++
		} else {
			break
		}
		holdButtonFor--
	}

	return time - numImpossibleSpeeds + 1
}

func main() {
	permutations := 1
	distance, time := readDataWOKerning("input.txt")
	permutations = calcNumOfImpossibleSpeeds(distance, time)
	fmt.Println(permutations)
}
