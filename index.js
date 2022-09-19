const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const patient = require("./patientSchema");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT;
const PROD = process.env.PROD;

if (PROD) {
  app.use(express.static(__dirname + "/vite-svelte/dist"));
}

//database connection
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.ajkefxa.mongodb.net/pluscare?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Mongodb connection established with username ${process.env.DBUSERNAME}`
    )
  )
  .catch((err) => console.log(err));

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

app.post("/api/register-patient", (req, res) => {
  const name = [
    {
      use: "official",
      given: [`${req.body.firstName}`],
      family: `${req.body.lastName}`,
    },
  ];
  const gender = `${req.body.gender}`;
  const birthDate = `${req.body.birthDate}`;
  const telecom = [
    {
      value: `${req.body.patientNumber}`,
      use: "mobile",
      system: "phone",
    },
    {
      value: `${req.body.patientEmail}`,
      system: "email",
    },
  ];
  const address = [
    {
      line: [`${req.body.streetName}`],
      city: `${req.body.cityName}`,
      state: `${req.body.stateName}`,
    },
  ];
  return res.status(200).send({
    success: true,
    mail: `${req.body.patientEmail}`,
  });
});

app.listen(PORT, "0.0.0.0", 1, (req, res) => {
  console.log(`Listening to the server on http://localhost:${PORT}`);
});
