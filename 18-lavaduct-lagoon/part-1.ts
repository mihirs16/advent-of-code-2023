import { readFileSync } from 'fs';

export type Direction = 'U' | 'D' | 'L' | 'R';
export type DigInstruction = [Direction, number, string];
export type Coordinate = [number, number]

const readData = (filename = "./18-lavaduct-lagoon/input.txt"): DigInstruction[] =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map(
            (row): DigInstruction => {
                const [dir, steps, hex] = row.split(' ');
                return [dir as Direction, parseInt(steps), hex];
            }
        );

export function outline(digInstructions: DigInstruction[]): [Coordinate[], number] {
    const toOutline: Coordinate[] = [];
    const cursor: Coordinate = [0, 0];
    var perimeter = 0;

    toOutline.push([0, 0]);
    for (const digInstruction of digInstructions) {
        perimeter += digInstruction[1];
        switch (digInstruction[0]) {
            case 'R': {
                toOutline.push([cursor[0], cursor[1] + digInstruction[1]]);
                cursor[1] = cursor[1] + digInstruction[1];
                break;
            }
            case 'L': {
                toOutline.push([cursor[0], cursor[1] - digInstruction[1]]);
                cursor[1] = cursor[1] - digInstruction[1];
                break;
            }
            case 'D': {
                toOutline.push([cursor[0] + digInstruction[1], cursor[1]]);
                cursor[0] = cursor[0] + digInstruction[1];
                break;
            }
            case 'U': {
                toOutline.push([cursor[0] - digInstruction[1], cursor[1]]);
                cursor[0] = cursor[0] - digInstruction[1];
                break;
            }

        }
    }

    return [toOutline, perimeter];
}

export function calcArea(path: Coordinate[]): number {
    var area = 0;
    for (let i = 1; i < path.length - 1; i++) {
        area += path[i][1] * (path[i + 1][0] - path[i - 1][0])
    }

    return area * 0.5;
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
