import fs from "fs";

let sum = 0;
const data = fs.readFileSync("src/data.txt").toString();
const lines = data.split("\n");
const lines2 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`.split("\n");
// part 1
lines.forEach((line: string) => {
    if (line === "") return;
    const winningNumbers = line
        .match(/\:[\s\d]+\|/g)[0]
        .match(/\d+/g)
        .map((str) => parseInt(str, 10));
    const myNumbers = line
        .match(/\|.*$/g)[0]
        .match(/\d+/g)
        .map((str) => parseInt(str, 10));
    let numOfMatches = 0;
    myNumbers.forEach((myNumber) => {
        winningNumbers.forEach((winningNumber) => {
            if (myNumber === winningNumber) numOfMatches++;
        });
    });
    if (numOfMatches !== 0) {
        sum += 2 ** (numOfMatches - 1);
    }
});
console.log("sum: ", sum);

// part 2
const cards: number[] = [];
lines.forEach((line: string) => {
    if (line === "") return;
    cards.push(1);
});
lines.forEach((line: string) => {
    if (line === "") return;
    const gameNumber = parseInt(line.match(/\d+/)[0], 10);
    console.log(gameNumber);
    const winningNumbers = line
        .match(/\:[\s\d]+\|/g)[0]
        .match(/\d+/g)
        .map((str) => parseInt(str, 10));
    const myNumbers = line
        .match(/\|.*$/g)[0]
        .match(/\d+/g)
        .map((str) => parseInt(str, 10));
    let numOfMatches = 0;
    myNumbers.forEach((myNumber) => {
        winningNumbers.forEach((winningNumber) => {
            if (myNumber === winningNumber) numOfMatches++;
        });
    });
    for (let i = 1; i <= cards[gameNumber - 1]; i++) {
        for (let n = 0; n < numOfMatches; n++) {
            cards[gameNumber + n]++;
        }
    }
});
let numOfCards = 0;
cards.forEach((cards) => (numOfCards += cards));
console.log("cards: ", cards);
console.log("numOfCards: ", numOfCards);
