import { readFileSync } from 'fs';

export function readData(filename = "./8-haunted-wasteland/input.txt"): [string, Map<string, string[]>] {
    const rawData = readFileSync(filename).toString();
    const [instructions, rawMap] = rawData.split('\n\n');
    const puzzleMap = new Map<string, string[]>();
    for (const eachRow of rawMap.trimEnd().split('\n')) {
        const [k, v] = eachRow.split(' = ')
        puzzleMap.set(k, v.slice(1, -1).split(', '));
    }

    return [instructions, puzzleMap];
}