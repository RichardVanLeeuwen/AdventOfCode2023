//const data = `Time:      7  15   30
//Distance:  9  40  200`;

const data = `Time:        40     70     98     79
Distance:   215   1051   2147   1005`;

const lines = data.split("\n");
const times = lines[0].match(/\d+/g);
const distances = lines[1].match(/\d+/g);
console.log(times);
console.log(distances);
let productOfPossibilities = 1;
for (let i = 0; i < times.length; i++) {
    productOfPossibilities *= solveQuad(
        parseInt(times[i], 10),
        parseInt(distances[i], 10),
    );
}
console.log("productOfPossibilities: ", productOfPossibilities);

let timeString = "";
let distanceString = "";
for (let i = 0; i < times.length; i++) {
    timeString += times[i];
    distanceString += distances[i];
}
const largeDiff = solveQuad(
    parseInt(timeString, 10),
    parseInt(distanceString, 10),
);
console.log("largeDiff: ", largeDiff);

// distance = x*(time-x)
// d = xt - x^2
// D= b^2-4ac
// a=1
// b=t
// c=d
// D= t^2-4*1*d
// x= (-t-D^.5)/2
// x= (-t+D^.5)/2

function solveQuad(b: number, c: number) {
    const d = b ** 2 - 4 * 1 * c;
    let firstAns = -((-b - d ** 0.5) / 2);
    const secondAns = Math.floor(-((-b + d ** 0.5) / 2)) + 1;
    if (firstAns !== Math.floor(firstAns)) {
        firstAns = Math.floor(firstAns) + 1;
    }
    console.log("firstAns: ", firstAns);
    console.log("secondAns: ", secondAns);
    console.log("diff: ", firstAns - secondAns);
    return firstAns - secondAns;
}
