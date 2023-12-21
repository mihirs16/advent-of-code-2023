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
) {
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
    for (const [k, module] of circuit.entries()) {
        for (const output of module.outputs) {
            let outMod = circuit.get(output);
            if (outMod?.category === '&') {
                outMod.conjMem.set(k, false);
            }
        }
    }

    return circuit
}

function propagate(circuit: Map<string, Module>): [number, number] {
    var lows = 1;
    var highs = 0;
    const queue: [string, boolean][] = [];
    queue.push(['roadcaster', false]);

    mainLoop:
    while (queue.length > 0) {
        const [k, signal] = queue.shift()!;
        const module = circuit.get(k)!;
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
        }
        if (output)
            highs += module.outputs.length;
        else
            lows += module.outputs.length;
    }
    return [lows, highs];
}


function main() {
    const circuit = readData();
    let lows = 0;
    let highs = 0;
    for (let i = 0; i < 1000; i++) {
        let [eachLow, eachHigh] = propagate(circuit);
        lows += eachLow;
        highs += eachHigh;
    }
    console.log(lows, highs);
    return lows * highs;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");