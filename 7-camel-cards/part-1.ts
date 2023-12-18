import { HandData, HandType } from "./utils";
import { readFileSync } from "fs";

var Cards: { [key: string]: number } = {
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13,
};

function calculateHandType(hand: string): HandType {
    var handType = HandType.High;
    var tally = new Map<string, number>();
    for (var card of hand) {
        var cardCount = (tally.get(card) || 0) + 1;
        tally.set(card, cardCount);
    }
    var freqs = new Set(tally.values());
    switch (tally.size) {
        case 5:
            handType = HandType.High;
            break;
        case 4:
            handType = HandType.OnePair;
            break;
        case 3:
            handType = freqs.has(2) ? HandType.TwoPair : HandType.ThreeOfAKind;
            break;
        case 2:
            handType = freqs.has(2) ? HandType.FullHouse : HandType.FourOfAKind;
            break;
        case 1:
            handType = HandType.FiveOfAKind;
            break;
    }

    return handType;
}

function readData(filename = "input.txt"): HandData[] {
    var rawData = readFileSync(filename, "utf8").trimEnd();
    return rawData.split("\n").map((line) => {
        var [hand, rawBid] = line.split(" ");
        return [hand, parseInt(rawBid), calculateHandType(hand)];
    });
}

function compareHands(hand1Data: HandData, hand2Data: HandData): -1 | 0 | 1 {
    var [hand1, _, hand1Type] = hand1Data;
    var [hand2, _, hand2Type] = hand2Data;

    if (hand1Type != hand2Type) return hand1Type > hand2Type ? 1 : -1;
    for (var i = 0; i < 5; i++) {
        if (hand1[i] == hand2[i]) continue;
        else return Cards[hand1[i]] > Cards[hand2[i]] ? 1 : -1;
    }

    return 0;
}

function solve(): void {
    const data = readData("input.txt");
    data.sort((a, b) => compareHands(a, b));
    var winnings = data.reduce((acc, cur, i) => acc + cur[1] * (i + 1), 0);
    console.log(winnings);
}

solve();
