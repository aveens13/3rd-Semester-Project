const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const PROD = process.env.PROD;

if (PROD) {
  app.use(express.static(__dirname + "/vite-svelte/dist"));
}

app.get("/api/contact/", (req, res) => {
  res.send({
    value: "test",
    er: "error",
  });
});

app.listen(PORT, "0.0.0.0", 1, (req, res) => {
  console.log(`Listening to the server on http://localhost:${PORT}`);
});
