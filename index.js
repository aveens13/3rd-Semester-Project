const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { credentials } = require("./config");
const patient = require("./patientSchema");
const patientlogin = require("./patientLoginSchema");
const ses = require("./sessions");
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
app.get("/api/is-logged-in", (req, res) => {
  const session = req.cookies.session;
  if (session) {
    ses.findOne({ sessionKey: session }).then((data) => {
      const userId = data.userId;
      patientlogin.findById(userId).then((result) => {
        console.log(result);
        patient.findById(result.patientId).then((response) => {
          console.log(response);
          return res.status(200).send({
            response,
          });
        });
      });
    });
  } else {
    return res.status(403).send({
      err: "No data available",
    });
  }
});

app.post("/api/signin", (req, res) => {
  const { myEmail, myPassword } = req.body;
  //console.log(myEmail, myPassword);
  try {
    patientlogin.findOne({ email: myEmail }).then(async (result) => {
      if (result != null) {
        if (await bcrypt.compare(myPassword, result.password)) {
          const sessionId = uuid.v4();
          res.cookie("session", sessionId, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          });
          const Session = await ses.create({
            sessionKey: sessionId,
            userId: result.id,
          });
          console.log(Session);
          patient.findById(result.patientId).then((resp) => {
            return res.status(200).send({
              response: resp,
            });
          });
        } else {
          return res.status(400).send({
            result: "failed",
          });
        }
      } else {
        return res.status(400).send({
          error: "email not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      result: "No such email",
    });
  }
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

app.post("/api/register-patient", async (req, res) => {
  let userEmail;
  const userPassword =
    req.body.firstName.toLowerCase() + `@${req.body.patientNumber}`;
  // const uniqueUserid = uuid.v4();
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
  let userId;
  try {
    const Patient = await patient.create({
      name,
      gender,
      birthDate,
      telecom,
      address,
    });
    userId = Patient.id;
    console.log(Patient.id);
  } catch (error) {
    console.log(error);
  }
  if (telecom[1].value == "") {
    userEmail = telecom[0].value;
  } else {
    userEmail = telecom[1].value;
  }
  try {
    const Patientlogin = await patientlogin.create({
      email: userEmail,
      password: userPassword,
      patientId: userId,
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send({
    success: true,
    mail: `${req.body.patientEmail}`,
    uid: userEmail,
    userPassword,
  });
});

app.listen(PORT, "0.0.0.0", 1, (req, res) => {
  console.log(`Listening to the server on http://localhost:${PORT}`);
});
