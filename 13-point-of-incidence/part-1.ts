import { readData } from './utils';

/**
 * 
 * @param pattern string[][]
 * @returns [isHorizontal, mirrorAfter]
 */
function findMirror(pattern: string[][]): [boolean, number] {
    const patternCol = (colIdx: number) => pattern.map((row) => row[colIdx]);

    function checkIfValidReflectionH(i: number) {
        let p = i;
        let q = i + 1;
        while (p >= 0 && q < pattern.length) {
            if (pattern[p].toString() !== pattern[q].toString()) {
                break;
            }
            p--;
            q++;
        }

        return p === -1 || q === pattern.length;
    }

    function checkIfValidReflectionV(i: number) {
        let p = i;
        let q = i + 1;
        while (p >= 0 && q < pattern[0].length) {
            const colP = patternCol(p);
            const colQ = patternCol(q);
            if (colP.toString() !== colQ.toString()) {
                break;
            }
            p--;
            q++;
        }

        return p === -1 || q === pattern[0].length;
    }

    for (let i = 0; i < pattern.length - 1; i++) {
        if (pattern[i].toString() === pattern[i + 1].toString()) {
            if (checkIfValidReflectionH(i)) {
                return [true, i];
            }
        }
    }

    for (let i = 0; i < pattern[0].length - 1; i++) {
        const colLeft = patternCol(i);
        const colRight = patternCol(i + 1);
        if (colLeft.toString() === colRight.toString()) {
            if (checkIfValidReflectionV(i)) {
                return [false, i];
            }
        }
    }

    return [false, -1];
}

function main() {
    const patterns = readData();
    var total = 0;
    for (const pattern of patterns) {
        const [isHorizontal, mirrorAfter] = findMirror(pattern);
        total += (mirrorAfter + 1) * (isHorizontal ? 100 : 1);
    }
    return total;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");