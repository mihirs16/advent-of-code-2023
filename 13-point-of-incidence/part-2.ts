import { readData } from './utils';

function isSmudged(patternRec1: string[], patternRec2: string[]): boolean {
    var howManyDiffs = 0;
    for (let i = 0; i < patternRec1.length; i++) {
        if (patternRec1[i] !== patternRec2[i]) {
            if (++howManyDiffs > 1) return false;
        }
    }
    return true;
}

/**
 * @param pattern string[][]
 * @returns [isHorizontal, mirrorAfter]
 */
function findMirror(pattern: string[][]): [boolean, number] {
    const patternCol = (colIdx: number) => pattern.map((row) => row[colIdx]);

    function checkIfValidReflectionH(i: number, withSmudge: boolean = false) {
        let p = i;
        let q = i + 1;
        let foundSmudge = false;
        while (p >= 0 && q < pattern.length) {
            if (pattern[p].toString() !== pattern[q].toString()) {
                if (withSmudge && isSmudged(pattern[p], pattern[q])) {
                    if (foundSmudge) break;
                    else foundSmudge = true;
                } else break;
            }
            p--;
            q++;
        }

        return p === -1 || q === pattern.length;
    }

    function checkIfValidReflectionV(i: number, withSmudge: boolean = false) {
        let p = i;
        let q = i + 1;
        let foundSmudge = false;
        while (p >= 0 && q < pattern[0].length) {
            const colP = patternCol(p);
            const colQ = patternCol(q);
            if (colP.toString() !== colQ.toString()) {
                if (withSmudge && isSmudged(colP, colQ)) {
                    if (foundSmudge) break;
                    else foundSmudge = true;
                } else break;
            }
            p--;
            q++;
        }

        return p === -1 || q === pattern[0].length;
    }

    var [isHorizontal, mirrorAfter] = [false, -1];
    var originalReflectionFound = false;
    for (let i = 0; i < pattern.length - 1; i++) {
        if (pattern[i].toString() === pattern[i + 1].toString()) {
            if (checkIfValidReflectionH(i)) {
                [isHorizontal, mirrorAfter] = [true, i];
                originalReflectionFound = true;
                break;
            }
        }
    }

    if (!originalReflectionFound) {
        for (let i = 0; i < pattern[0].length - 1; i++) {
            const colLeft = patternCol(i);
            const colRight = patternCol(i + 1);
            if (colLeft.toString() === colRight.toString()) {
                if (checkIfValidReflectionV(i)) {
                    [isHorizontal, mirrorAfter] = [false, i];
                    originalReflectionFound = true;
                    break;
                }
            }
        }
    }

    // console.log([isHorizontal, mirrorAfter]);
    for (let i = 0; i < pattern.length - 1; i++) {
        if (pattern[i].toString() === pattern[i + 1].toString() || isSmudged(pattern[i], pattern[i + 1])) {
            if (checkIfValidReflectionH(i, true)) {
                // console.log(pattern[i].toString(), pattern[i + 1].toString(), [isHorizontal, i]);
                if (!isHorizontal || mirrorAfter !== i) return [true, i];
            }
        }
    }

    for (let i = 0; i < pattern[0].length - 1; i++) {
        const colLeft = patternCol(i);
        const colRight = patternCol(i + 1);
        if (colLeft.toString() === colRight.toString() || isSmudged(colLeft, colRight)) {
            // console.log(i, colLeft.toString(), colRight.toString(), checkIfValidReflectionV(i, true));
            if (checkIfValidReflectionV(i, true)) {
                if (isHorizontal || mirrorAfter !== i) return [false, i];
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