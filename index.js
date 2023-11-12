const lib = require("./lib.js");
const express = require("express");
// const fs = require("fs");
console.log("hello");

const server = express();
server.listen(8080);
// const t1 = performance.now();
// const text = fs.readFileSync("./demo.txt", "utf-8");
// fs.readFile("./demo.txt", "utf-", (err, text) => {
//   console.log(text, "text");
// // });
// console.log(text, "text");
// console.log(lib.sum(10, 89), lib.diff(10, 89));
// const t2 = performance.now();
// console.log(t2 - t1);
// const a = 5;
