import { readFileSync } from 'fs';

type Coordinate = [number, number];
const Directions: Coordinate[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const readData = (filename = './21-step-counter/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map(row => row.split(''));

function countSteps(grid: string[][], startPos: Coordinate, totalSteps: number) {
    const monitor = new Set<string>();
    const seen = new Set<string>([startPos.toString()]);
    const queue: [Coordinate, number][] = [[startPos, totalSteps]];

    while (queue.length > 0) {
        const [coord, stepsLeft] = queue.shift()!;

        if (stepsLeft % 2 === 0) monitor.add(coord.toString());
        if (stepsLeft === 0) continue;

        for (const dir of Directions) {
            let ncoord: Coordinate = [coord[0] + dir[0], coord[1] + dir[1]];
            if (
                ncoord[0] < 0
                || ncoord[0] >= grid.length
                || ncoord[1] < 0
                || ncoord[1] >= grid[0].length
                || grid[ncoord[0]][ncoord[1]] === '#'
                || seen.has(ncoord.toString())
            ) continue;
            seen.add(ncoord.toString());
            queue.push([ncoord, stepsLeft - 1]);
        }
    }

    return monitor.size;
}

function main() {
    const grid = readData();
    const startPos: Coordinate = [0, 0];

    mainLoop:
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'S') {
                startPos[0] = i;
                startPos[1] = j;
                break mainLoop;
            }
        }
    }

    return countSteps(grid, startPos, 26501365);
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");