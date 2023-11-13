const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");
const server = express();

// bodyParser
server.use(express.json()); // json type middleWare
// server.use(express.urlencoded()) // urlencoded type middleWare
server.use(morgan("default"));
server.use(express.static("public")); // default
// server.use((req, res, next) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get("User-Agent")
//   ); // Custom log middleware
//   next();
// });

const auth = (req, res, next) => {
  // // console.log(req.query);
  // if (req.body.password == "123") {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }
  next();
};

// API - Endpoint - Route
server.get("/products/:id", auth, (req, res) => {
  console.log(req.params);
  res.json({ type: "GET" });
});

server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", auth, (req, res) => {
  res.json({ type: "PUT" });
});
server.delete("/", auth, (req, res) => {
  res.json({ type: "DELETE" });
});
server.patch("/", auth, (req, res) => {
  res.json({ type: "PATCH" });
});

server.get("/demo", (req, res) => {
  // res.send("<h1>hello</h1>");
  // res.sendFile("D:/nodeApp/index.html");
  // res.json(products)
  // res.sendStatus(404)
  // res.status(201).send("<h1>hello</h1>")
});

server.listen(8080, () => {
  console.log("server started");
});
