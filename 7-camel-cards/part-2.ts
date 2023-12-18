import { HandData, HandType } from "./utils";
import { readFileSync } from "fs";

var Cards: { [key: string]: number } = {
    J: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
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

    function handTypeFromTallyFreqs(tally: Map<string, number>, freqs: Set<number>) {
        var thisHandType = HandType.High;
        switch (tally.size) {
            case 5:
                thisHandType = HandType.High;
                break;
            case 4:
                thisHandType = HandType.OnePair;
                break;
            case 3:
                thisHandType = freqs.has(2) ? HandType.TwoPair : HandType.ThreeOfAKind;
                break;
            case 2:
                thisHandType = freqs.has(2) ? HandType.FullHouse : HandType.FourOfAKind;
                break;
            case 1:
                thisHandType = HandType.FiveOfAKind;
                break;
        }

        return thisHandType;
    }

    handType = handTypeFromTallyFreqs(tally, freqs);

    if (tally.has('J')) {
        for (const possibleJ of tally.keys()) {
            if (possibleJ === 'J') continue;
            const tempTally = new Map(tally);
            const upgradedValueOfPossibleJ = (tempTally.get(possibleJ) || 0) + (tempTally.get('J') || 0);
            tempTally.set(possibleJ, upgradedValueOfPossibleJ);
            tempTally.delete('J');
            const possibleHandType = handTypeFromTallyFreqs(tempTally, new Set(tempTally.values()));
            handType = possibleHandType > handType ? possibleHandType : handType;
        }
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
