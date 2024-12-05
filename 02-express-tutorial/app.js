const express = require("express");
const path = require("path");
const { products, people } = require("./data");  
const peopleRouter = require("./routes/people");

const app = express();
console.log("Express Tutorial");

app.use(express.static("./public"));


// Middleware logger
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();

  console.log(`${method} ${url} at ${time}`);
  next();
};

app.use(logger);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});


app.use("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found" });
  }
});


app.get("/api/v1/query", (req, res) => {
  const { search, limit, priceLessThan, regex } = req.query;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (priceLessThan) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price < parseFloat(priceLessThan)
    );
  }
  if (regex) {
    const pattern = new RegExp(regex, "i");
    filteredProducts = filteredProducts.filter((product) =>
      pattern.test(product.name)
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  res.json(filteredProducts);
});


app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});


app.listen(3000, () => {
  console.log("server is listening on port 3000....");
});
