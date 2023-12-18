import { readFileSync } from 'fs';

export function readData(filename = './14-parabolic-reflector-dish/input.txt') {
    const data: string[][] = [];
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const eachRow of rawData.split('\n')) {
        data.push(eachRow.split(''));
    }

    return data;
}

export function calculateLoad(table: string[][]): number {
    var load = 0;
    for (let i = 0; i < table.length; i++) {
        let thisRowCount = 0;
        for (let j = 0; j < table[0].length; j++) {
            if (table[i][j] === 'O') thisRowCount++;
        }
        load += thisRowCount * (table.length - i);
    }

    return load;
}
