import { readData } from '../10-pipe-maze/utils';
import { expansion, generateListOfPairs, sumShortestDistances } from './utils';

function main() {
    const galaxyMap = readData('./11-cosmic-expansion/input.txt');
    const [galaxies, rowsToExpand, colsToExpand] = expansion(galaxyMap);
    const pairs = generateListOfPairs(galaxies);
    return sumShortestDistances(pairs, rowsToExpand, colsToExpand, 2);
}

console.log(main());
