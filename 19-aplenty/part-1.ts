import { readFileSync } from 'fs';

type Category = 'x' | 'm' | 'a' | 's' | undefined;
type Comparison = '>' | '<' | undefined;
type Workflow = [Category, Comparison, number, string][];
type Part = Map<Category, number>;

function readData(filename = './19-aplenty/input.txt'): [Map<string, Workflow>, Part[]] {
    const rawData = readFileSync(filename).toString().trimEnd();
    const [rawWorkflows, rawParts] = rawData.split('\n\n');
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

    const parts = new Array<Part>();
    for (let part of rawParts.split('\n')) {
        const categories = part.slice(1, -1).split(',').map((x) => parseInt(x.split('=')[1]));
        const map: Part = new Map<Category, number>();
        map.set('x', categories[0]);
        map.set('m', categories[1]);
        map.set('a', categories[2]);
        map.set('s', categories[3]);
        parts.push(map);
    }

    return [workflows, parts];
}



function main() {
    const [workflow, parts] = readData();

    function traverseWorkflow(workflowKey: string, part: Part): 'A' | 'R' {
        if (workflowKey === 'A') return 'A';
        if (workflowKey === 'R') return 'R';

        workflowLoop:
        for (const condition of workflow.get(workflowKey)!) {
            if (condition[2] === -1) return traverseWorkflow(condition[3], part);

            let outcome: boolean = false;
            if (condition[1] === '<') outcome = part.get(condition[0])! < condition[2];
            else outcome = part.get(condition[0])! > condition[2];

            if (outcome) return traverseWorkflow(condition[3], part);
            else continue;
        }

        return 'R';
    }

    var total = 0;
    for (const part of parts) {
        const outcome = traverseWorkflow('in', part)
        if (outcome === 'A')
            for (const partVal of part.values())
                total += partVal
    }

    return total;
}

let start = Date.now();
console.log(main());
let timeTaken = Date.now() - start;
console.log("took: " + timeTaken + " milliseconds");