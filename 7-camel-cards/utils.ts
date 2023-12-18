enum HandType {
    High = 1,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

type HandData = [string, number, HandType];

export { HandType, HandData };
