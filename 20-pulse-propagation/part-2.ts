import { readFileSync } from 'fs';

type Category = '%' | '&' | 'b' | 'o';

class Module {
    category: Category;
    outputs: string[];
    conjMem: Map<string, boolean>;
    on: boolean;

    constructor(category: Category, outputs: string[]) {
        this.category = category;
        this.outputs = outputs;
        this.conjMem = new Map<string, boolean>();
        this.on = false;
    }
}

function readData(
    filename = './20-pulse-propagation/input.txt'
): [Map<string, Module>, Map<string, number>] {
    const circuit = new Map<string, Module>();
    const rawData = readFileSync(filename).toString().trimEnd();
    for (const row of rawData.split('\n')) {
        const [k, v] = row.split(' -> ');
        circuit.set(
            k.slice(1),
            new Module(k[0] as Category, v.split(', '))
        )
    }

    // populate all conjunctions
    const rxParentCycles = new Map<string, number>();
    for (const [k, module] of circuit.entries()) {
        for (const output of module.outputs) {
            let outMod = circuit.get(output);
            if (outMod?.category === '&') {
                outMod.conjMem.set(k, false);
            }

            if (output === 'lg') {
                rxParentCycles.set(k, -1);
            }
        }
    }


    return [circuit, rxParentCycles]
}

function propagate(
    circuit: Map<string, Module>,
    rxParentCycles: Map<string, number>,
    cycle: number
): boolean {
    const queue: [string, boolean][] = [];
    queue.push(['roadcaster', false]);
    var rx = true;

    mainLoop:
    while (queue.length > 0) {
        const [k, signal] = queue.shift()!;
        const module = circuit.get(k)!;
        if (k === 'rx') rx = signal;
        if (module === undefined) continue;
        let output = false;
        switch (module.category) {
            case 'b': {
                output = signal;
                break;
            } case '%': {
                if (signal) continue mainLoop;
                else {
                    module.on = !module.on;
                    output = module.on;
                }
                break;
            } case '&': {
                output = true;
                for (const v of module.conjMem.values()) output = output && v;
                output = !output;
                break;
            }
        }

        for (const destMod of module.outputs) {
            queue.push([destMod, output]);
            let mod = circuit.get(destMod);
            if (mod?.category === '&') {
                mod.conjMem.set(k, output);
            }

            if (destMod === 'lg' && output) {
                rxParentCycles.set(k, cycle);
            }
        }
    }

    return rx;
}

function LCM(cycles: number[]): number {
    function HCF(a: number, b: number): number {
        if (a === 0) return b;
        if (b === 0) return a;
        return HCF(b, a % b);
    }

    function lcm(a: number, b: number): number {
        return (a / HCF(a, b)) * b;
    }

    return cycles.reduce((acc, curr) => lcm(acc, curr));
}

function main() {
    const [circuit, rxParentCycles] = readData();
    for (var i = 0; true; i++) {
        propagate(circuit, rxParentCycles, i + 1);
        let cycles = Array.from(rxParentCycles.values());
        if (!cycles.includes(-1)) {
            console.log(rxParentCycles);
            return LCM(cycles);
        }
    }
    return 0;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");