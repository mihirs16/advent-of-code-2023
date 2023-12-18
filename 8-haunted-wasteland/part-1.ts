import { readData } from './utils';

function main() {
    const [instructions, map] = readData();
    var location = 'AAA';
    var steps = 0;
    while (location !== 'ZZZ') {
        const nextInstruction = instructions[steps % instructions.length] === 'L' ? 0 : 1;
        location = map.get(location)![nextInstruction];
        steps++;
    }

    console.log(steps);
}

main();