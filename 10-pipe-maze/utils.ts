import { readFileSync } from 'fs';

export type Coordinates = [number, number];
export type PuzzleMap = string[][]

export function readData(filename = './10-pipe-maze/input.txt'): string[][] {
    const map: string[][] = [];
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const eachRow of rawData.split('\n')) {
        map.push(eachRow.split(''))
    }

    return map;
}

export function findStartPosition(map: PuzzleMap, dimensions: Coordinates): [Coordinates, Coordinates] {
    const start: Coordinates = [0, 0];

    loop1:
    for (var i = 0; i < dimensions[0]; i++) {
        for (var j = 0; j < dimensions[1]; j++) {
            if (map[i][j] === 'S') {
                start[0] = i
                start[1] = j;
                break loop1;
            }
        }
    }

    var nextCoord: Coordinates = start;
    const possibleCoords: Coordinates[] = [[start[0] - 1, start[1]], [start[0] + 1, start[1]], [start[0], start[1] - 1], [start[0], start[1] + 1]];
    const possibleSymbol = [['|', '7', 'F'], ['|', 'L', 'J'], ['J', '-', '7'], ['L', '-', 'F']];
    for (var i = 0; i < 4; i++) {
        const isPossibleNextValUp = possibleCoords[i][0] >= 0
            && possibleCoords[i][0] < dimensions[0]
            && possibleCoords[i][1] >= 0
            && possibleCoords[i][1] < dimensions[1];
        if (!isPossibleNextValUp) continue;
        const possibleNextVal = map[possibleCoords[i][0]][possibleCoords[i][1]];
        const isValidNextVal = possibleSymbol[i].includes(possibleNextVal);
        if (isValidNextVal) {
            nextCoord = possibleCoords[i];
            break;
        }
    }

    return [start, nextCoord];
}

export function nextStep(map: PuzzleMap, curr: Coordinates, next: Coordinates): [Coordinates, Coordinates] {
    const tmp: Coordinates = [next[0], next[1]];
    const isSameY = curr[0] === next[0]
    switch (map[next[0]][next[1]]) {
        case '|': {
            next[0] += next[0] - curr[0];
            break;
        } case '-': {
            next[1] += next[1] - curr[1];
            break;
        } case 'L': {
            if (isSameY) next[0] -= 1
            else next[1] += 1
            break;
        } case 'J': {
            if (isSameY) next[0] -= 1;
            else next[1] -= 1;
            break;
        } case '7': {
            if (isSameY) next[0] += 1;
            else next[1] -= 1
            break;
        } case 'F': {
            if (isSameY) next[0] += 1;
            else next[1] += 1
        } default: break;
    }

    return [tmp, next]
}

export function traverse(map: PuzzleMap, start: Coordinates, next: Coordinates): Set<string> {
    var path: Set<string> = new Set<string>();
    path.add(start.toString());
    path.add(next.toString());
    var [curr, next] = nextStep(map, start, next);
    while (map[curr[0]][curr[1]] !== 'S') {
        [curr, next] = nextStep(map, curr, next);
        path.add(curr.toString());
    }
    return path;
}
