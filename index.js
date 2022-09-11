const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT;
const PROD = process.env.PROD;

if (PROD) {
  app.use(express.static(__dirname + "/vite-svelte/dist"));
}

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//server api requests

app.post("/api/signin", (req, res) => {
  res.send({
    result: "Success",
  });
});

app.post("/api/admin-login", async (req, res) => {
  const { adminUsername, adminPassword } = req.body;
  console.log(adminUsername, adminPassword);
  console.log(process.env.ADMINPASSWORD);
  if (adminUsername == process.env.ADMINUSERNAME) {
    if (await bcrypt.compare(adminPassword, process.env.ADMINPASSWORD)) {
      console.log("Admin Login Requested and Passed");
      return res.status(200).send({
        result: "success",
      });
    }
    return res.status(401).send({
      result: "failed",
    });
  }
  res.status(404).send({
    result: "Server Error",
  });
});

app.get("/api/contact/", (req, res) => {
  res.send({
    value: "test",
    er: "error",
  });
});

app.listen(PORT, "0.0.0.0", 1, (req, res) => {
  console.log(`Listening to the server on http://localhost:${PORT}`);
});
