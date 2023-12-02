import fs from "fs";

function toNumber(num: string) {
  if (num === "one" || num === "1") return "1";
  if (num === "two" || num === "2") return "2";
  if (num === "three" || num === "3") return "3";
  if (num === "four" || num === "4") return "4";
  if (num === "five" || num === "5") return "5";
  if (num === "six" || num === "6") return "6";
  if (num === "seven" || num === "7") return "7";
  if (num === "eight" || num === "8") return "8";
  if (num === "nine" || num === "9") return "9";
}

function reverse(str: string) {
  return str.split("").reverse().join("");
}

let sum = 0;
let sum2 = 0;
const data = fs.readFileSync("src/data.txt").toString();
const lines = data.split("\n");
lines.pop();
lines.forEach((line) => {
  if (line === "") {
    return;
  }
  const reverseLine = reverse(line);
  // for part 1
  const firstnum = line.match(/([0-9]){1}/)[0];
  const lastnum = line.match(/([0-9]){1}[a-z]*$/)[1];
  const num = parseInt(firstnum + lastnum, 10);
  sum += num;

  // for part 2
  const firstnum2 = line.match(
    /([0-9]|one|two|three|four|five|six|seven|eight|nine){1}/,
  )[0];
  const lastnum2 = reverseLine.match(
    /([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/,
  )[0];
  const realfirstNum2 = toNumber(firstnum2);
  const realLastNum2 = toNumber(reverse(lastnum2));
  const num2 = parseInt(`${realfirstNum2}${realLastNum2}`, 10);
  sum2 += num2;
});
console.log("sum", sum);
console.log("sum2", sum2);
