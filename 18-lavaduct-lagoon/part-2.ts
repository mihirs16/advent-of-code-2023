import { readFileSync } from 'fs';
import { DigInstruction, Direction, calcArea, outline } from './part-1';

function readData(filename = "./18-lavaduct-lagoon/input.txt"): DigInstruction[] {
    const rawData = readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map(
            (row): DigInstruction => {
                const [__, _, hex] = row.split(' ');
                const steps = parseInt('0x' + hex.slice(2, 7));
                var dir = '';
                switch (parseInt('0x' + hex.slice(7))) {
                    case 0: dir = 'R'; break;
                    case 1: dir = 'D'; break;
                    case 2: dir = 'L'; break;
                    case 3: dir = 'U'; break;
                }

                return [dir as Direction, steps, hex];
            }
        );

    return rawData;
}

function main() {
    const digInstructions = readData();
    const [toOutline, perimeter] = outline(digInstructions);
    return calcArea(toOutline) + (perimeter / 2) + 1;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");
