import { readData } from './utils';

function extrapolate(series: number[]): number {
    const deltas = [];
    var allZeroes = true;
    for (var i = 0; i < series.length - 1; i++) {
        allZeroes = series[i] === 0 && allZeroes ? true : false;
        deltas.push(series[i + 1] - series[i]);
    }

    if (allZeroes) return 0;
    return series[i] + extrapolate(deltas);
}

function main(): number {
    const data = readData();
    var sumOfExtrapolation = 0;
    for (const series of data)
        sumOfExtrapolation += extrapolate(series);

    return sumOfExtrapolation;
}

console.log(main());