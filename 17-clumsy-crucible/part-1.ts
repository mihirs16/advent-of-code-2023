import { readFileSync } from 'fs';
import Heap from 'heap-js';

type Coordinates = [number, number]
const Dirs: Coordinates[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const readData = (filename = './17-clumsy-crucible/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map(
            rawRow => rawRow.split('')
                .map(val => parseInt(val))
        );

function dijkstra(grid: number[][], source: Coordinates, destination: Coordinates) {
    const visited = new Set<string>(); // Set<[steps: number, pos: Coordinates, dir: Coordinates]>
    const minHeap = new Heap<[number, number, Coordinates, Coordinates]>((tuple1, tuple2) => tuple1[0] - tuple2[0]);

    const outsideBounds = (pos: Coordinates) =>
        pos[0] < 0 || pos[0] >= grid.length || pos[1] < 0 || pos[1] >= grid[0].length;
    const isSameCoord = (dir1: Coordinates, dir2: Coordinates): boolean => dir1[0] === dir2[0] && dir1[1] === dir2[1]
    const gridVal = (pos: Coordinates) => grid[pos[0]][pos[1]];

    minHeap.push([0, 0, source, [0, 0]]);
    while (minHeap.size() > 0) {
        var [cDist, cSteps, cPos, cDir] = minHeap.pop()!;
        if (isSameCoord(cPos, destination)) return cDist;

        if (visited.has([cSteps, cPos, cDir].toString())) continue;
        visited.add([cSteps, cPos, cDir].toString());

        if (cSteps < 3 && !isSameCoord(cDir, [0, 0])) {
            let nPos: Coordinates = [cPos[0] + cDir[0], cPos[1] + cDir[1]];
            if (!outsideBounds(nPos)) {
                minHeap.push([cDist + gridVal(nPos), cSteps + 1, nPos, cDir]);
            }
        }

        for (const nDir of Dirs) {
            if (!isSameCoord(cDir, nDir) && !isSameCoord(cDir, [-nDir[0], -nDir[1]])) {
                let nPos: Coordinates = [cPos[0] + nDir[0], cPos[1] + nDir[1]];
                if (!outsideBounds(nPos)) {
                    minHeap.push([cDist + gridVal(nPos), 1, nPos, nDir]);
                }
            }
        }
    }
}

function main() {
    const grid = readData();
    return dijkstra(grid, [0, 0], [grid.length - 1, grid[0].length - 1]);
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");
