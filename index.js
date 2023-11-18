require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// db connection code
main().catch((err) => console.log(err, "err"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

//bodyParser
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
