const fs = require("fs");
const http = require("http");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const product = products.find((p) => p.id == +id);
    res.setHeader("Content-Type", "text/html");
    let modifiedIndex = index
      .replace("**title**", product.title)
      .replace("**url**", product.thumbnail)
      .replace("**price**", product.price)
      .replace("**rating**", product.rating);
    res.end(modifiedIndex);
    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;

    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(data);
      break;
    default:
      res.writeHead(404);
      res.end();
  }
  console.log("server started");
  //   res.setHeader("dummy", "demo");
});
server.listen(8080);
