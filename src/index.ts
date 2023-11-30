import fs from "fs";

const data = fs.readFileSync("src/data.txt").toString();
console.log(data);
