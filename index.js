require("dotenv").config();
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const jwt = require("jsonwebtoken");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
// db connection code
main().catch((err) => console.log(err, "err"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

//bodyParser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token, "token");
    const decoded = jwt.verify(token, publicKey);
    console.log(decoded, "decoded");
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/users", auth, userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
