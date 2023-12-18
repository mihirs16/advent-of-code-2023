import {
    readData,
    Coordinates,
    outsideBounds,
    isSameDir,
    Up, Down, Left, Right,
    step,
} from './utils';

function energize(grid: string[][], startPos: Coordinates, startDir: Coordinates) {
    const seen = new Map<string, Coordinates[]>();
    const queue: [Coordinates, Coordinates][] = [[startPos, startDir]];

    mainLoop:
    while (queue.length > 0) {
        const [currPos, currDir] = queue.shift()!;
        if (outsideBounds(grid, currPos)) continue;

        var seenDirs = seen.get(currPos.toString());
        if (seenDirs) {
            for (const dir of seenDirs)
                if (isSameDir(dir, currDir))
                    continue mainLoop;
            seenDirs.push(currDir);
        } else seenDirs = [currDir];
        seen.set(currPos.toString(), seenDirs);

        switch (grid[currPos[0]][currPos[1]]) {
            case '.': {
                queue.push(step(currPos, currDir));
                break;
            } case '|': {
                if (isSameDir(currDir, Left) || isSameDir(currDir, Right)) {
                    queue.push(step(currPos, Up));
                    queue.push(step(currPos, Down));
                } else {
                    queue.push(step(currPos, currDir));
                }
                break;
            } case '-': {
                if (isSameDir(currDir, Up) || isSameDir(currDir, Down)) {
                    queue.push(step(currPos, Left));
                    queue.push(step(currPos, Right));
                } else {
                    queue.push(step(currPos, currDir));
                }
                break;
            } case '\\': {
                let dir: Coordinates = currDir;
                if (isSameDir(currDir, Up)) dir = Left;
                if (isSameDir(currDir, Down)) dir = Right;
                if (isSameDir(currDir, Left)) dir = Up;
                if (isSameDir(currDir, Right)) dir = Down;
                queue.push(step(currPos, dir));
                break;
            } case '/': {
                let dir: Coordinates = currDir;
                if (isSameDir(currDir, Up)) dir = Right;
                if (isSameDir(currDir, Down)) dir = Left;
                if (isSameDir(currDir, Left)) dir = Down;
                if (isSameDir(currDir, Right)) dir = Up;
                queue.push(step(currPos, dir));
                break;

            }
        }
    }

    return seen.size;
}

function main() {
    const grid = readData();
    var maxEnergy = 0;

    for (let i = 0; i < grid[0].length; i++) {
        maxEnergy = Math.max(maxEnergy, energize(grid, [0, i], Down));
        maxEnergy = Math.max(maxEnergy, energize(grid, [grid.length - 1, i], Up));
    }

    for (let i = 0; i < grid.length; i++) {
        maxEnergy = Math.max(maxEnergy, energize(grid, [i, 0], Right));
        maxEnergy = Math.max(maxEnergy, energize(grid, [i, grid[0].length - 1], Left));
    }

    return maxEnergy;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");