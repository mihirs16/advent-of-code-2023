import { readFileSync } from 'fs';

const index: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

const readData = (filename = './1-trebuchet/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n');

function parseCalibration(row: string): number {
    var num = 0;

    fwdLoop:
    for (let i = 0; i < row.length; i++) {
        let x = parseInt(row[i]);
        if (!Number.isNaN(x)) {
            num = x * 10;
            break;
        }

        for (const ix of Object.keys(index)) {
            if (row.slice(i).startsWith(ix)) {
                num = index[ix] * 10;
                break fwdLoop;
            }
        }
    }

    revLoop:
    for (let i = row.length - 1; i >= 0; i--) {
        let x = parseInt(row[i]);
        if (!Number.isNaN(x)) {
            num += x;
            break;
        }

        for (const ix of Object.keys(index)) {
            if (row.slice(i).startsWith(ix)) {
                num += index[ix];
                break revLoop;
            }
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