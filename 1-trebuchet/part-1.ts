import { readFileSync } from 'fs';

const readData = (filename = './1-trebuchet/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')

function parseCalibration(row: string): number {
    var num = 0;
    for (let i = 0; i < row.length; i++) {
        let x = parseInt(row[i]);
        if (!Number.isNaN(x)) {
            num = x * 10;
            break;
        }
    }
    for (let i = row.length - 1; i >= 0; i--) {
        let x = parseInt(row[i]);
        if (!Number.isNaN(x)) {
            num += x;
            break;
        }
    }
    return num;
}

function main() {
    const data = readData();
    var sum = 0;
    for (const row of data) {
        sum += parseCalibration(row);
    }

    return sum;
}

console.log(main());