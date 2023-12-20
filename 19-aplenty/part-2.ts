import { readFileSync } from 'fs';

type Category = 'x' | 'm' | 'a' | 's' | undefined;
type Comparison = '>' | '<' | undefined;
type Workflow = [Category, Comparison, number, string][];

function readData(filename = './19-aplenty/input.txt'): Map<string, Workflow> {
    const rawData = readFileSync(filename).toString().trimEnd();
    const rawWorkflows = rawData.split('\n\n')[0];
    const workflows = new Map<string, Workflow>();
    for (const workflow of rawWorkflows.split('\n')) {
        const [k, v] = workflow.split('{');
        workflows.set(k, v
            .slice(0, -1)
            .split(',')
            .map((x) => {
                const tuple = x.split(':');
                if (tuple.length === 1) return [undefined, undefined, -1, tuple[0]];
                return [
                    tuple[0][0] as Category,
                    tuple[0][1] as Comparison,
                    parseInt(tuple[0].slice(2)),
                    tuple[1]
                ];
            })
        );
    }
    return workflows;
}


function main() {
    const workflows = readData();
    var initRanges = new Map<Category, [number, number]>()

    initRanges.set('x', [1, 4000]);
    initRanges.set('m', [1, 4000]);
    initRanges.set('a', [1, 4000]);
    initRanges.set('s', [1, 4000]);

    function dfs(
        workflowKey: string,
        ranges: Map<Category, [number, number]>
    ): number {
        if (workflowKey === 'R') return 0;
        if (workflowKey === 'A') {
            let accepted = 1;
            ranges.forEach(v => accepted *= v[1] - v[0] + 1);
            return accepted;
        }

        let accepted = 0;
        for (const [category, comparison, newBound, nextWorkflow] of workflows.get(workflowKey)!) {
            if (newBound === -1) {
                accepted += dfs(nextWorkflow, ranges);
                continue;
            }

            let trueRange: [number, number] = [0, 0];
            let falseRange: [number, number] = [0, 0];
            let [lowerBound, upperBound] = ranges.get(category)!;
            if (comparison === '<') {
                trueRange = [lowerBound, Math.min(newBound - 1, upperBound)];
                falseRange = [Math.max(newBound, lowerBound), upperBound];
            } else {
                trueRange = [Math.max(newBound + 1, lowerBound), upperBound];
                falseRange = [lowerBound, Math.min(newBound, upperBound)];
            }

            let newRanges = new Map(ranges);
            newRanges.set(category, trueRange);
            accepted += dfs(nextWorkflow, newRanges);

            ranges.set(category, falseRange);

        }

        return accepted;
    }

    return dfs('in', initRanges);
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");