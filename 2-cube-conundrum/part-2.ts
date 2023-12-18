import { readData } from './utils';

function main() {
    const data = readData();
    var sumPower = 0;
    for (let game = 0; game < data.length; game++) {
        const maxCubes: { [key: string]: number } = { red: 0, green: 0, blue: 0 };
        for (let subset = 0; subset < data[game].length; subset++) {
            for (var cube = 0; cube < data[game][subset].length; cube++) {
                const [freq, color] = data[game][subset][cube].split(' ');
                if (maxCubes[color] < parseInt(freq)) maxCubes[color] = parseInt(freq);
            }
        }
        sumPower += maxCubes['red'] * maxCubes['green'] * maxCubes['blue'];
    }

    return sumPower;
}

console.log(main());