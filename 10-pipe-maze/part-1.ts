import { Coordinates, readData, traverse, findStartPosition } from './utils';

function main() {
    const map = readData();
    const dimensions: Coordinates = [map.length, map[0].length];
    const [start, next] = findStartPosition(map, dimensions);
    const steps = traverse(map, start, next).size;
    return Math.ceil(steps / 2);
}

console.log(main());