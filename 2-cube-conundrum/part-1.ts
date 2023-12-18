import { readData } from './utils';

function main() {
    const total: { [key: string]: number } = { red: 12, green: 13, blue: 14 };
    const data = readData();
    var sumPossible = 0;
    gameLoop:
    for (let game = 0; game < data.length; game++) {
        for (let subset = 0; subset < data[game].length; subset++) {
            for (var cube = 0; cube < data[game][subset].length; cube++) {
                const [freq, color] = data[game][subset][cube].split(' ');
                if (total[color] < parseInt(freq)) continue gameLoop;
            }
        }
        sumPossible += game + 1;
    }

    return sumPossible;
}

console.log(main());