import fs from "fs";

let possibleSum = 0;
let sumOfPowers = 0;
const data = fs.readFileSync("src/data.txt").toString();
const lines = data.split("\n");
lines.forEach((game) => {
  if (game === "") return;
  const gameParts = game.split(":");
  const gameNumber = parseInt(gameParts[0].match(/(\d)+/)[0], 10);
  const scoreParts = gameParts[1].split(";");
  let maxNumOfReds: number | undefined = undefined;
  let maxNumOfGreens: number | undefined = undefined;
  let maxNumOfBlues: number | undefined = undefined;
  scoreParts.forEach((scores) => {
    const redMatches = scores.match(/([\d]+) red/);
    if (redMatches) {
      const numOfReds = parseInt(redMatches[1], 10);
      if (numOfReds > maxNumOfReds || maxNumOfReds === undefined) {
        maxNumOfReds = numOfReds;
      }
    }
    const greenMatches = scores.match(/([\d]+) green/);
    if (greenMatches) {
      const numOfGreens = parseInt(greenMatches[1], 10);
      if (numOfGreens > maxNumOfGreens || maxNumOfGreens === undefined) {
        maxNumOfGreens = numOfGreens;
      }
    }
    const blueMatches = scores.match(/([\d]+) blue/);
    if (blueMatches) {
      const numOfBlues = parseInt(blueMatches[1], 10);
      if (numOfBlues > maxNumOfBlues || maxNumOfBlues === undefined) {
        maxNumOfBlues = numOfBlues;
      }
    }
  });
  if (
    (maxNumOfGreens == undefined || maxNumOfGreens <= 13) &&
    (maxNumOfReds === undefined || maxNumOfReds <= 12) &&
    (maxNumOfBlues === undefined || maxNumOfBlues <= 14)
  ) {
    possibleSum += gameNumber;
  }
  const gamePower = maxNumOfReds * maxNumOfGreens * maxNumOfBlues;
  sumOfPowers += gamePower;
});
console.log("impossibleSum: ", possibleSum);
console.log("sumOfPowers: ", sumOfPowers);
