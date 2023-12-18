import { read, readFileSync } from 'fs';

export function readData(filename = "./9-mirage-maintenance/input.txt"): number[][] {
    const listOfSeries: number[][] = [];
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const rawSeries of rawData.split('\n'))
        listOfSeries.push(rawSeries.trimEnd().split(' ').map((elem) => parseInt(elem)));
    return listOfSeries;
}
