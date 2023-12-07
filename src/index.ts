import fs from "fs";

class Map {
    start: number = undefined;
    end: number = undefined;
    diff: number = undefined;
    constructor(line: string) {
        const matches = line.match(/\d+/g);
        this.start = parseInt(matches[1], 10);
        this.end = this.start + parseInt(matches[2]);
        this.diff = parseInt(matches[0], 10) - this.start;
    }
    canMap = (inputNum: number): boolean => {
        return inputNum >= this.start && inputNum < this.end;
    };
    map = (inputnum: number): number => {
        return inputnum + this.diff;
    };
}

const data = fs.readFileSync("src/data.txt").toString();
const parts = data.split("\n\n");

// part 1
const seeds = parts[0].match(/\d+/g).map((str) => parseInt(str, 10));
let locations: number[] = seeds;
for (let i = 1; i <= 7; i++) {
    locations = locations.map(createMapper(parts[1]));
}
let lowestLocationNumber = 0;
locations.forEach((location) => {
    if (location < lowestLocationNumber || lowestLocationNumber === 0)
        lowestLocationNumber = location;
});
console.log("lowestLocationNumber: ", lowestLocationNumber);

// part 2
const startRangePairs = parts[0].match(/\d+ \d+/g).map((str) => {
    return str.split(" ").map((str) => parseInt(str, 10));
});
let lowestLocationNumber2 = 0;
startRangePairs.forEach((pair) => {
    const allMaps = [];
    for (let i = 1; i <= 7; i++) {
        allMaps.push(createMapper(parts[i]));
    }
    for (let i = 0; i < pair[1]; i++) {
        let currentSeedTransformingToLocation = pair[0] + i;
        allMaps.forEach((map) => {
            currentSeedTransformingToLocation = map(
                currentSeedTransformingToLocation,
            );
        });
        if (
            currentSeedTransformingToLocation < lowestLocationNumber2 ||
            lowestLocationNumber2 === 0
        ) {
            lowestLocationNumber2 = currentSeedTransformingToLocation;
        }
    }
});
console.log("lowestLocationNumber2: ", lowestLocationNumber2);

function createMapper(part: string): (num: number) => number {
    const lines = part.split("\n");
    const maps: Map[] = [];
    for (let i = 1; i < lines.length; i++) {
        maps.push(new Map(lines[i]));
    }
    return (numberToMap: number): number => {
        let outputNum = -1;
        maps.forEach((map) => {
            if (map.canMap(numberToMap)) {
                outputNum = map.map(numberToMap);
            }
        });
        return outputNum === -1 ? numberToMap : outputNum;
    };
}
