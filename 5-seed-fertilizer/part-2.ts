import { readData, Data, RangeMap } from "./utils";

function getMapValue(map: RangeMap[], sourceVal: number): number {
    for (var eachRange of map) {
        if (
            sourceVal >= eachRange.sourceRangeStart &&
            sourceVal <= eachRange.sourceRangeStart + eachRange.rangeLength
        ) {
            return (
                eachRange.destRangeStart +
                (sourceVal - eachRange.sourceRangeStart)
            );
        }
    }
    return sourceVal;
}

function solve() {
    var minLocation = Infinity;
    var data: Data = readData();

    function getSeedLocation(seedVal: number) {
        var soilVal = getMapValue(data.seedToSoil, seedVal);
        var fertVal = getMapValue(data.soilToFertilizer, soilVal);
        var waterVal = getMapValue(data.fertilizerToWater, fertVal);
        var lightVal = getMapValue(data.waterToLight, waterVal);
        var tempVal = getMapValue(data.lightToTemp, lightVal);
        var humidityVal = getMapValue(data.tempToHumidity, tempVal);
        var locationVal = getMapValue(data.humidityToLocation, humidityVal);
        return locationVal;
    }

    for (var i = 0; i < data.seedData.length; i += 2) {
        for (
            var seedVal = data.seedData[i];
            seedVal < data.seedData[i] + data.seedData[i + 1];
            seedVal++
        ) {
            var locationVal = getSeedLocation(seedVal);
            minLocation = Math.min(locationVal, minLocation);
        }
    }
    console.log(minLocation);
}

solve();
