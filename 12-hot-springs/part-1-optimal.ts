import { readFileSync } from 'fs';

function readData(filename = "./12-hot-springs/input.txt"): [string, number[]][] {
    const data: [string, number[]][] = [];
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const eachRow of rawData.split('\n')) {
        const [rawSeries, rawFaults] = eachRow.split(' ');
        data.push([
            rawSeries,
            rawFaults.split(',').map(x => parseInt(x))
        ])
    }
    return data;
}

function permute(series: string, faults: number[]): number {
    if (series.length === 0)
        return faults.length === 0 ? 1 : 0;

    if (faults.length === 0)
        return series.includes('#') ? 0 : 1;

    var result = 0;
    if (series[0] === '.' || series[0] === '?')
        result += permute(series.slice(1), faults);

    if (series[0] === '#' || series[0] === '?')
        if (
            faults[0] <= series.length
            && !series.slice(0, faults[0]).includes('.')
            && (
                faults[0] === series.length
                || series[faults[0]] !== '#'
            )
        )
            result += permute(series.slice(faults[0] + 1), faults.slice(1));

    return result;
}

function main() {
    const data = readData();
    var sum = 0;
    for (const row of data)
        sum += permute(row[0], row[1]);
    return sum;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
