import { readFileSync } from 'fs';
import { hash } from './utils';

type Instruction = [string, '-' | '=', number?];
type Lens = [string, number];

function readData(filename = './15-lens-library/input.txt'): Instruction[] {
    const rawData = readFileSync(filename).toString().trimEnd();
    const instructions: Instruction[] = [];
    for (const rawInstruction of rawData.split(',')) {
        if (rawInstruction.slice(-1) === '-') {
            instructions.push([rawInstruction.split('-')[0], '-'])
        } else {
            const [label, value] = rawInstruction.split('=');
            instructions.push([label, '=', parseInt(value)]);
        }
    }
    return instructions;
}

function push(boxes: Lens[][], label: string, val: number) {
    const k = hash(label);
    for (var i = 0; i < boxes[k].length; i++) {
        if (boxes[k][i][0] === label) {
            boxes[k][i][1] = val;
            return;
        }
    }
    boxes[k].push([label, val]);
}

function pop(boxes: Lens[][], label: string) {
    const k = hash(label);
    for (var i = 0; i < boxes[k].length; i++) {
        if (boxes[k][i][0] === label) {
            boxes[k].splice(i, 1);
            return;
        }
    }
}

function main() {
    const boxes = Array.from(new Array<Lens[]>(256), () => new Array<Lens>());
    const instructions = readData();
    for (const instruction of instructions) {
        const label = instruction[0]
        if (instruction[1] === '-') {
            pop(boxes, label);
        } else {
            push(boxes, label, instruction[2]!);
        }
    }

    var sum = 0;
    for (let box = 0; box < boxes.length; box++) {
        for (let lens = 0; lens < boxes[box].length; lens++) {
            sum += (1 + box) * (1 + lens) * boxes[box][lens][1];
        }
    }

    return sum;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");