import { readFileSync } from 'fs';

export function readData(filename = './13-point-of-incidence/input.txt') {
    const rawData = readFileSync(filename).toString().trimEnd();
    const patterns: string[][][] = [];
    for (const rawPattern of rawData.split('\n\n')) {
        patterns.push(
            rawPattern.split('\n').map(eachRow => eachRow.split(''))
        );
    }

    return patterns;
}
