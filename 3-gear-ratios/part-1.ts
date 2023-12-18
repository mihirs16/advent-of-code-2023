import { readFileSync } from 'fs';

const readData = (filename = './3-gear-ratios/input.txt') =>
    readFileSync(filename)
        .toString()
        .trimEnd()
        .split('\n')
        .map((row) => row.split(''));

function symbolicNeighbour(grid: string[][], row: number, col: number): boolean {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            const nRow = row + i;
            const nCol = col + j;
            if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[row].length) {
                if (grid[nRow][nCol] !== '.' && Number.isNaN(parseInt(grid[nRow][nCol])))
                    return true;
            }

        }
    }

    return false;
}

function parseRow(grid: string[][], row: number) {
    var l = 0;
    var r = 0;
    var isValidNum: boolean = false;
    var tmpNums: number[] = [];
    var rowSum = 0;
    while (r <= grid[row].length) {
        const isLNum = !Number.isNaN(parseInt(grid[row][l]));
        const isRNum = !Number.isNaN(parseInt(grid[row][r]));

        if (isLNum && isRNum) {
            tmpNums.push(parseInt(grid[row][r]));
            if (symbolicNeighbour(grid, row, r)) isValidNum = true;
            r++;
            continue;
        }

        if (isLNum && !isRNum) {
            if (isValidNum) {
                let num = 0;
                for (let i = tmpNums.length - 1; i >= 0; i--) {
                    num += tmpNums[tmpNums.length - i - 1] * Math.pow(10, i);
                }
                rowSum += num;
            }
            tmpNums = [];
            isValidNum = false;
        }

        l = ++r;
    }

    return rowSum;
}

function main() {
    const grid = readData();
    var total = 0;
    for (let r = 0; r < grid.length; r++) {
        total += parseRow(grid, r);
    }

    return total;
}

console.log(main());
