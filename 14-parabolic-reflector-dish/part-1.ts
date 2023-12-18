import { calculateLoad, readData } from './utils';

function tiltNorth(table: string[][]): void {
    for (let colIdx = 0; colIdx < table[0].length; colIdx++) {
        let l = 0;
        let r = 0;
        while (r < table.length) {
            if (table[l][colIdx] === '.' && table[r][colIdx] === 'O') {
                let tmp = table[l][colIdx];
                table[l][colIdx] = table[r][colIdx];
                table[r][colIdx] = tmp;
            }

            if (table[l][colIdx] !== '.') l++;
            if (table[r][colIdx] === '#') l = r;
            r++;
        }
    }
}

function main() {
    const table = readData();
    tiltNorth(table);
    return calculateLoad(table);
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");