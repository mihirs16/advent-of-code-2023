import { readFileSync } from 'fs';


export function readData(filename = "./12-hot-springs/input.txt"): [string, number[]][] {
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

function isValidRecord(series: string, faults: number[]): boolean {
    let i = 0;
    let j = 0;
    let k = 0;
    let faultCompare = faults[j];
    while (i < series.length) {
        if (series[i] === '#') {
            let faultCharge = 0;
            while (series[i] === '#') {
                faultCharge++;
                i++;
            }

            if (faultCompare === undefined) return false;
            if (faultCharge === faultCompare) k++;
            faultCompare = faults[++j];
        } else {
            i++;
        }
    }

    return k === faults.length;
}

function permute(series: string, faults: number[]): number {
    function dfs(series: string, i: number): number {
        var ways = 0;

        if (series[i] === undefined) {
            const isValid = isValidRecord(series, faults);
            return isValid ? 1 : 0;
        }

        if (series[i] === '?') {
            ways += dfs(series.slice(0, i) + '.' + series.slice(i + 1), i + 1)
                + dfs(series.slice(0, i) + '#' + series.slice(i + 1), i + 1);
        } else {
            ways += dfs(series, i + 1);
        }

        return ways;
    }
    const ans = dfs(series, 0);
    return ans;
}

function main() {
    const data = readData();
    var sum = 0;
    for (const record of data) {
        const ways = permute(record[0], record[1]);
        sum += ways
    }
    return sum;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
