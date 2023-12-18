import { readFileSync } from 'fs';

const readData = (filename = './3-gear-ratios/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map((row) => row.split(''));

function symbolicNeighbour(grid: string[][], row: number, col: number): [number, number] | false {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            const nRow = row + i;
            const nCol = col + j;
            if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[row].length) {
                if (grid[nRow][nCol] === '*' && Number.isNaN(parseInt(grid[nRow][nCol])))
                    return [nRow, nCol];
            }

        }
    }

    return false;
}



function main() {
    const grid = readData();
    var gearRatios = new Map<string, Set<number>>();
    for (let row = 0; row < grid.length; row++) {
        var l = 0;
        var r = 0;
        var isValidNum: boolean = false;
        var tmpNums: number[] = [];
        var tmpGears: [number, number][] = [];

        while (r <= grid[row].length) {
            const isLNum = !Number.isNaN(parseInt(grid[row][l]));
            const isRNum = !Number.isNaN(parseInt(grid[row][r]));

            if (isLNum && isRNum) {
                tmpNums.push(parseInt(grid[row][r]));
                const gear = symbolicNeighbour(grid, row, r)
                if (gear) tmpGears.push(gear);
                r++;
                continue;
            }

            if (isLNum && !isRNum) {
                let num = 0;
                for (let i = tmpNums.length - 1; i >= 0; i--) {
                    num += tmpNums[tmpNums.length - i - 1] * Math.pow(10, i);
                }
                for (const gear of tmpGears) {
                    const lst = gearRatios.get(gear.toString()) ?? new Set<number>();
                    lst.add(num);
                    gearRatios.set(gear.toString(), lst);
                }
                tmpNums = [];
                isValidNum = false;
                tmpGears = [];
            }

            l = ++r;
        }
    }

    var total = 0;
    for (const gear of gearRatios) {
        if (gear[1].size === 2) {
            let gearRatio = 1;
            for (const g of gear[1]) {
                gearRatio *= g;
            }
            total += gearRatio;
        }
    }
    return total;
}

console.log(main());
