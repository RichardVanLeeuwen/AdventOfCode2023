import fs from "fs";

let sum = 0;
const data = fs.readFileSync("src/data.txt").toString();
const lines = data.split("\n");
// Part 1
lines.forEach((line: string, index: number) => {
    if (line === "") return;
    const matches = line.match(/\d+/g);
    if (matches === null) return;
    matches.forEach((match) => {
        const startPos = line.search(match);
        let foundBelow = false;
        let foundAbove = false;
        let foundInFront = false;
        let foundAfter = false;
        if (index !== 0) {
            foundAbove = searchRow(index - 1, startPos, match.length);
        }
        if (index !== lines.length - 1) {
            foundBelow = searchRow(index + 1, startPos, match.length);
        }
        if (startPos !== 0) {
            foundInFront = line.at(startPos - 1) !== ".";
        }
        if (startPos !== line.length - match.length) {
            foundAfter = line.at(startPos + match.length) !== ".";
        }
        if (match.length === 1) {
            line = line.replace(match, ".");
        }
        if (match.length === 2) {
            line = line.replace(match, "..");
        }
        if (match.length === 3) {
            line = line.replace(match, "...");
        }
        if (foundBelow || foundAbove || foundInFront || foundAfter) {
            sum += parseInt(match, 10);
        } else {
        }
    });
});
console.log("sum: ", sum);

let gearSum = 0;
// part 2
lines.forEach((line: string, index: number) => {
    if (line === "") return;
    // never worry about start or end of lines.
    line = "..." + line + "...";
    while (line.search(/\*/) !== -1) {
        const position = line.search(/\*/);
        const numbers: number[] = [];
        checkAfter(line, position, numbers);
        checkBefore(line, position, numbers);
        if (index !== 0)
            checkAboveOrBelow("..." + lines[index - 1] + "...", position, numbers);
        if (index !== lines.length)
            checkAboveOrBelow("..." + lines[index + 1] + "...", position, numbers);
        line = setCharAt(line, position, ".");
        if (numbers.length >= 2) {
            let localProduct = 1;
            numbers.forEach((num) => {
                localProduct *= num;
            });
            gearSum += localProduct;
        }
    }
});
console.log("gearSum :", gearSum);

function checkAfter(line: string, position: number, numbers: number[]) {
    const linePart = line.substring(position + 1);
    const foundNumber = linePart.match(/^(\d+)/);
    if (foundNumber !== null) {
        numbers.push(parseInt(foundNumber[1], 10));
    }
}

function checkBefore(line: string, position: number, numbers: number[]) {
    const linePart = line.substring(0, position);
    const foundNumber = linePart.match(/(\d+)$/);
    if (foundNumber !== null) {
        numbers.push(parseInt(foundNumber[1], 10));
    }
}

function checkAboveOrBelow(line: string, position: number, numbers: number[]) {
    let linePart = line.substring(position - 3, position + 4);
    let isLeftNum: boolean;
    let isMiddleNum: boolean;
    let isRightNum: boolean;
    isLeftNum = linePart.charAt(2).match(/\d/) !== null;
    isMiddleNum = linePart.charAt(3).match(/\d/) !== null;
    isRightNum = linePart.charAt(4).match(/\d/) !== null;
    if (!isLeftNum && !isMiddleNum && !isRightNum) return;
    if (isLeftNum && isMiddleNum && isRightNum) {
        numbers.push(parseInt(linePart.slice(2, 5), 10));
    } else if (!isMiddleNum) {
        // possibly 2 nums present
        const startMatch = linePart.slice(0, 3).match(/\d+$/);
        if (startMatch !== null) {
            numbers.push(parseInt(startMatch[0], 10));
        }
        const endMatch = linePart.slice(4).match(/^\d+/);
        if (endMatch !== null) {
            numbers.push(parseInt(endMatch[0], 10));
        }
    } else if (isMiddleNum) {
        if (isLeftNum) {
            const startMatch = linePart.slice(1, 4).match(/\d+$/);
            numbers.push(parseInt(startMatch[0], 10));
        } else if (isRightNum) {
            const endMatch = linePart.slice(3).match(/^\d+/);
            numbers.push(parseInt(endMatch[0], 10));
        } else {
            numbers.push(parseInt(linePart.charAt(3), 10));
        }
    } else if (isLeftNum) {
        const str = linePart.slice(0, 3);
        numbers.push(parseInt(str.match(/\d+$/)[0], 10));
    } else if (isRightNum) {
        const str = linePart.slice(3);
        numbers.push(parseInt(str.match(/^\d+/)[0], 10));
    }
}

function searchRow(index: number, startPos: number, length: number) {
    const searchLine = lines[index];
    let startMod = 0;
    let endMod = 0;
    if (startPos !== 0) startMod++;
    if (startPos + length !== lines[0].length) endMod++;
    const searchPart = searchLine.slice(
        startPos - startMod,
        startPos + length + endMod,
    );
    const hasCharacterMatch = searchPart.match(/[^\w\d\.\s]/);
    return hasCharacterMatch !== null;
}

function setCharAt(str: string, i: number, chr: string) {
    return str.substring(0, i) + chr + str.substring(i + 1);
}
