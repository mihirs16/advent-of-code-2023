import { Coordinates } from '../10-pipe-maze/utils';

export function expansion(galaxyMap: string[][]): [Coordinates[], number[], number[]] {
    const galaxies: Coordinates[] = [];
    const rowsToExpand: number[] = [];
    const colsToExpand: number[] = [];
    const galaxyColumn = (idx: number) => galaxyMap.map(x => x[idx]);

    for (var i = 0; i < galaxyMap.length; i++) {
        if (!galaxyMap[i].includes('#')) rowsToExpand.push(i);
    }

    for (var i = 0; i < galaxyMap[0].length; i++) {
        if (!galaxyColumn(i).includes('#')) colsToExpand.push(i);
    }

    for (var i = 0; i < galaxyMap.length; i++) {
        for (var j = 0; j < galaxyMap[0].length; j++) {
            if (galaxyMap[i][j] === '#') {
                galaxies.push([i, j]);
            }
        }
    }

    return [galaxies, rowsToExpand, colsToExpand];
}

export function generateListOfPairs(galaxies: Coordinates[]): [Coordinates, Coordinates][] {
    const pairs: [Coordinates, Coordinates][] = []
    for (var i = 0; i < galaxies.length - 1; i++) {
        for (var j = i + 1; j < galaxies.length; j++) {
            pairs.push([galaxies[i], galaxies[j]]);
        }
    }

    return pairs;
}

export function sumShortestDistances(
    pairs: [Coordinates, Coordinates][],
    rowsToExpand: number[],
    colsToExpand: number[],
    distanceMultiplier: number
): number {
    var sum: number = 0;
    for (const pair of pairs) {
        const shortestDistance = Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]);
        var expandedDistance = 0;
        for (const expandedRow of rowsToExpand) {
            const rowPair = [pair[0][0], pair[1][0]];
            if (Math.max(...rowPair) >= expandedRow && expandedRow > Math.min(...rowPair))
                expandedDistance += distanceMultiplier - 1;
        }

        for (const expandedCol of colsToExpand) {
            const colPair = [pair[0][1], pair[1][1]];
            if (Math.max(...colPair) >= expandedCol && expandedCol > Math.min(...colPair))
                expandedDistance += distanceMultiplier - 1;
        }

        sum += shortestDistance + expandedDistance;
    }
    return sum;
}
