import { stdout } from 'process';
import { Coordinates, readData, traverse, findStartPosition, PuzzleMap } from './utils';

function calcArea(map: PuzzleMap, dimensions: Coordinates, path: Set<string>): number {
    var area = 0;
    for (var i = 0; i < dimensions[0]; i++) {
        for (var j = 0; j < dimensions[1]; j++) {
            if (path.has([i, j].toString())) continue;
            var raycastHits = 0;
            for (var k = j; k < dimensions[1]; k++) {
                if (path.has([i, k].toString()) && ['|', 'J', 'L'].includes(map[i][k])) {
                    raycastHits++;
                }
            }
            if (raycastHits && raycastHits % 2 != 0) {
                area++;
            }
        }
    }

    return area;
}

function main() {
    const map = readData();
    const dimensions: Coordinates = [map.length, map[0].length];
    const [start, next] = findStartPosition(map, dimensions);
    const path = traverse(map, start, next);
    const area = calcArea(map, dimensions, path);
    return area;
}

console.log(main());