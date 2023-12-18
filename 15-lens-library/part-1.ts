import { readFileSync } from 'fs';
import { hash } from './utils';

function readData(filename = './15-lens-library/input.txt'): string[] {
    const rawData = readFileSync(filename).toString().trimEnd();
    return rawData.split(',');
}

function main() {
    const instructions = readData();
    var sum = 0;
    for (const instruction of instructions) sum += hash(instruction);
    return sum;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");