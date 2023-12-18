import { readData } from './utils';

function main() {
    const [instructions, map] = readData();
    var locations: string[] = Array.from(map.keys()).filter((k) => k[2] === 'A');
    var steps: number[] = [];

    for (const l in locations) {
        var thisLocation = locations[l]
        var thisSteps = 0;
        while (thisLocation[2] !== 'Z') {
            const nextInstruction = instructions[thisSteps % instructions.length] === 'L' ? 0 : 1;
            thisLocation = map.get(thisLocation)![nextInstruction];
            thisSteps++;
        }

        steps.push(thisSteps);
    }



    function LCM(arr: number[]): number {
        function HCF(a: number, b: number): number {
            if (a === 0) return b;
            if (b === 0) return a;
            return HCF(b, a % b)
        }

        function LCMFromHCF(a: number, b: number): number {
            return a / HCF(a, b) * b;
        }

        return arr.reduce((acc, curr) => LCMFromHCF(acc, curr));
    }


    console.log(LCM(steps));
}

main();