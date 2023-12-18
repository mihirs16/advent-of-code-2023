import { readFileSync } from "fs";

interface RangeMap {
    destRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
}

interface Data {
    seedData: number[];
    seedToSoil: RangeMap[];
    soilToFertilizer: RangeMap[];
    fertilizerToWater: RangeMap[];
    waterToLight: RangeMap[];
    lightToTemp: RangeMap[];
    tempToHumidity: RangeMap[];
    humidityToLocation: RangeMap[];
}

function rangeMapsFromRaw(rawData: string): RangeMap[] {
    return rawData
        .split("\n")
        .slice(1)
        .map((eachRawRangeMap) => {
            var rangeMapData = eachRawRangeMap.split(" ");
            return {
                destRangeStart: parseInt(rangeMapData[0]),
                sourceRangeStart: parseInt(rangeMapData[1]),
                rangeLength: parseInt(rangeMapData[2]),
            };
        });
}

function readData(filename = "./5-seed-fertilizer/input.txt") {
    var f = readFileSync(filename);
    var rawData = f.toString().trim().split("\n\n");
    var data: Data = {
        seedData: rawData[0]
            .split(" ")
            .slice(1)
            .map((eachSeed) => parseInt(eachSeed)),
        seedToSoil: rangeMapsFromRaw(rawData[1]),
        soilToFertilizer: rangeMapsFromRaw(rawData[2]),
        fertilizerToWater: rangeMapsFromRaw(rawData[3]),
        waterToLight: rangeMapsFromRaw(rawData[4]),
        lightToTemp: rangeMapsFromRaw(rawData[5]),
        tempToHumidity: rangeMapsFromRaw(rawData[6]),
        humidityToLocation: rangeMapsFromRaw(rawData[7]),
    };
    return data;
}

export { readData, Data, RangeMap };
