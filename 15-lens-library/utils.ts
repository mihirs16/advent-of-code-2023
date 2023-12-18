export function hash(instruction: string): number {
    var curr = 0;
    for (var i = 0; i < instruction.length; i++) {
        curr += instruction.charCodeAt(i);
        curr *= 17;
        curr %= 256;
    }

    return curr;
}
