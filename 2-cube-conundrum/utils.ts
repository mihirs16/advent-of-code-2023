import { readFileSync } from 'fs';

export function readData(filename = './2-cube-conundrum/input.txt') {
    const rawData = readFileSync(filename).toString().trimEnd();
    const data = [];
    for (const row of rawData.split('\n')) {
        data.push(
            row
                .split(': ')[1]
                .split('; ')
                .map(
                    (subset) =>
                        subset
                            .split(', ')
                )
        );
    }

    return data;
}
