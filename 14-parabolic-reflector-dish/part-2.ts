import { calculateLoad, readData } from './utils';

function tiltVertical(table: string[][], direction: 'north' | 'south'): void {
    for (let colIdx = 0; colIdx < table[0].length; colIdx++) {
        let l = direction === 'north' ? 0 : (table.length - 1);
        let r = direction === 'north' ? 0 : (table.length - 1);
        while (r >= 0 && r < table.length) {
            if (table[l][colIdx] === '.' && table[r][colIdx] === 'O') {
                let tmp = table[l][colIdx];
                table[l][colIdx] = table[r][colIdx];
                table[r][colIdx] = tmp;
            }

            if (table[l][colIdx] !== '.') l += direction === 'north' ? 1 : -1;
            if (table[r][colIdx] === '#') l = r;
            r += direction === 'north' ? 1 : -1;
        }
    }
}

function tiltHorizontal(table: string[][], direction: 'west' | 'east'): void {
    for (let rowIdx = 0; rowIdx < table.length; rowIdx++) {
        let l = direction === 'west' ? 0 : (table[0].length - 1);
        let r = direction === 'west' ? 0 : (table[0].length - 1);
        while (r >= 0 && r < table[0].length) {
            if (table[rowIdx][l] === '.' && table[rowIdx][r] === 'O') {
                let tmp = table[rowIdx][l];
                table[rowIdx][l] = table[rowIdx][r];
                table[rowIdx][r] = tmp;
            }

            if (table[rowIdx][l] !== '.') l += direction === 'west' ? 1 : -1;
            if (table[rowIdx][r] === '#') l = r;
            r += direction === 'west' ? 1 : -1;
        }
    }
}

function main() {
    const totalCycles = 1000000000;
    var cycleDiff: number = 0;
    var table = readData();
    const conspiracy = new Map<string, number>();
    conspiracy.set(table.toString(), 0);

    // detect cycle
    var i = 0;
    while (true) {
        tiltVertical(table, 'north');
        tiltHorizontal(table, 'west');
        tiltVertical(table, 'south');
        tiltHorizontal(table, 'east');
        if (conspiracy.has(table.toString())) {
            cycleDiff = i - (conspiracy.get(table.toString()) ?? 0);
            break;
        }
        conspiracy.set(table.toString(), i++);
    }

    // backtrack cycle
    var remainder = i + ((totalCycles - i) % cycleDiff);

    // calculate cycle
    table = readData();
    for (let i = 0; i < remainder; i++) {
        tiltVertical(table, 'north');
        tiltHorizontal(table, 'west');
        tiltVertical(table, 'south');
        tiltHorizontal(table, 'east');
    }
    return calculateLoad(table);
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");