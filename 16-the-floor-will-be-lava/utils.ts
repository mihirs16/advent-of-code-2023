import { readFileSync } from 'fs';

export type Coordinates = [number, number]
export const Up: Coordinates = [-1, 0];
export const Down: Coordinates = [1, 0];
export const Left: Coordinates = [0, -1];
export const Right: Coordinates = [0, 1];

export function readData(
    filename = './16-the-floor-will-be-lava/input.txt'
): string[][] {
    const rawData = readFileSync(filename).toString().trimEnd();
    return rawData.split('\n').map(row => row.split(''));
}

export const isSameDir = (dir1: Coordinates, dir2: Coordinates) => dir1[0] === dir2[0] && dir1[1] === dir2[1];
export const step = (pos: Coordinates, dir: Coordinates): [Coordinates, Coordinates] =>
    [[pos[0] + dir[0], pos[1] + dir[1]], dir];
export const outsideBounds = (grid: string[][], currPos: Coordinates) =>
    (currPos[0] < 0 || currPos[0] >= grid.length)
    || (currPos[1] < 0 || currPos[1] >= grid[0].length);
