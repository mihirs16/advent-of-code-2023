import { readFileSync } from 'fs';

export function readData(filename = "./12-hot-springs/input.txt"): [string, number[]][] {
    const data: [string, number[]][] = [];
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const eachRow of rawData.split('\n')) {
        var [rawSeries, rawFaults] = eachRow.split(' ');
        var series: string = '';
        var faults: number[] = [];
        for (var i = 0; i < 5; i++) {
            series += rawSeries + '?';
            faults = faults.concat(rawFaults.split(',').map(x => parseInt(x)));
        }

        data.push([series.slice(0, series.length - 1), faults])
    }

    return data;
}

function permute(series: string, faults: number[]): number {
    const cache = new Map<string, number>();
    function dfs(series: string, faults: number[]) {
        const k = [series, faults].toString();
        const v = cache.get(k);
        if (v !== undefined) return v;

        if (series.length === 0)
            return faults.length === 0 ? 1 : 0;

        if (faults.length === 0)
            return series.includes('#') ? 0 : 1;

        var result = 0;
        if (series[0] === '.' || series[0] === '?')
            result += dfs(series.slice(1), faults);

        if (series[0] === '#' || series[0] === '?')
            if (
                faults[0] <= series.length
                && !series.slice(0, faults[0]).includes('.')
                && (
                    faults[0] === series.length
                    || series[faults[0]] !== '#'
                )
            )
                result += dfs(series.slice(faults[0] + 1), faults.slice(1));

        cache.set(k, result);
        return result;
    }

    return dfs(series, faults);
}

function main() {
    const data = readData();
    var sum = 0;
    for (const record of data) {
        sum += permute(record[0], record[1]);
    }
    return sum;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
