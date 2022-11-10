const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const { credentials } = require("./config");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const patient = require("./patientSchema");
const patientlogin = require("./patientLoginSchema");
const ses = require("./sessions");
const ticket = require("./ticketSchema");
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
app.use(fileupload());

//server api requests
app.get("/api/patients/", async (req, res) => {
  try {
    const numberofPatients = await patient.find({}).count();
    patient.find({}).then((data) => {
      console.log(data);
      res.status(200).send({
        data,
        numberofPatients,
      });
    });
  } catch (err) {
    res.status(404).send({
      status: "Unable to fetch data",
    });
  }
});

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

app.get("/api/logout", (req, res) => {
  res.clearCookie("session");
  res.send({
    status: "logout",
  });
});

app.post("/api/create", (req, res) => {
  const session = req.cookies.session;
  let patientResult;
  ses.findOne({ sessionKey: session }).then((data) => {
    const userId = data.userId;
    patientlogin.findById(userId).then((result) => {
      patient.findById(result.patientId).then((response) => {
        console.log(response);
        patientResult = response;
        console.log(
          patientResult.name[0].given[0] + " " + patientResult.name[0].family
        );
      });
    });
  });
  console.log(req.files);
  res.send("okay");
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

app.get("/api/getimage/:picture", async (req, res) => {
  var filename = req.params.picture;
  await ticket.findById(filename).then((results) => {
    res.setHeader("content-type", results.conditionImage.contentType);
    res.send(results.conditionImage.data);
  });
});
app.get("/api/ticketinfo", async (req, res) => {
  const noOfTickets = await ticket.find({}).count();
  await ticket.find({}).then((results) => {
    res.status(200).send({
      data: results,
      noOfTickets,
    });
  });
});

app.get("/api/docs", (req, res) => {
  res.send({
    message: "Api Docs is still under development",
  });
});
app.get("/api/deleteTicket/:ticketId", async (req, res) => {
  var ticketId = req.params.ticketId;
  try {
    await ticket.findByIdAndDelete(ticketId).then(() => {
      res.status(200).send({
        message: "ticket was deleted",
      });
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});
app.post("/api/createticket", async (req, res) => {
  let condition = [];
  let medication = "";
  let medicationAllergy = "";
  let medicineList = "";
  let allergy = "";
  let oxygenSaturation = null;
  let temperature = null;
  let heartRate = null;
  let hbaLevel = null;
  let glucoseFasting = null;
  let glucoseRandom = null;
  if (req.body.condition) {
    condition = req.body.condition;
  }
  if (req.body.medication) {
    medication = req.body.medication;
  }
  if (req.body.medicationAllergy) {
    medicationAllergy = req.body.medicationAllergy;
  }
  if (req.body.medicine) {
    medicineList = req.body.medicine;
  }
  if (req.body.allergy) {
    allergy = req.body.allergy;
  }
  if (req.body.oxygen) {
    oxygenSaturation = req.body.oxygen;
    temperature = req.body.temperature;
    heartRate = req.body.heart;
  }
  console.log(req.body.type);
  if (req.body.hba) {
    hbaLevel = req.body.hba;
    glucoseFasting = req.body.glucoseFasting;
    glucoseRandom = req.body.glucoseRandom;
  }
  const symptom = req.body.symptom;
  console.log(symptom);
  console.log(condition);
  console.log(medication);
  console.log(req.body.desc);
  const session = req.cookies.session;
  let description = "";
  if (req.body.desc) {
    description = req.body.desc;
  }
  if (symptom == null) {
    console.log("True its null");
  } else {
    console.log("It's not null");
  }
  if (symptom == null) {
    return res.status(406).send({
      message: "Error Creating this ticket",
    });
  }
  if (req.files) {
    var photo = req.files.photo;
    console.log(req.files.photo);
    photo.mv(`./uploads/${photo.name}`, async (err) => {
      if (err) throw err;
    });
    try {
      ses.findOne({ sessionKey: session }).then((data) => {
        const userId = data.userId;
        patientlogin.findById(userId).then((result) => {
          patient.findById(result.patientId).then(async (response) => {
            patientResult = response;
            console.log(patientResult);
            await ticket.create({
              type: req.body.type,
              createdBy: {
                firstName: patientResult.name[0].given[0],
                lastName: patientResult.name[0].family,
              },
              condition,
              symptom,
              medication: {
                isTaking: medication,
                medicineList,
              },
              measurements: {
                oxygenSaturation,
                temperature,
                heartRate,
                hbaLevel,
                glucoseFasting,
                glucoseRandom,
              },
              medicationAllergy: {
                hasAllergy: medicationAllergy,
                allergy,
              },
              conditionImage: {
                data: photo.data,
                contentType: `${photo.mimetype}`,
              },
              completed: false,
              dateCreated: Date.now(),
              description,
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        success: false,
        message: "Cannot save to the database",
      });
    }
    return res.status(200).send({
      success: true,
      condition,
      symptom,
      medication,
      medicationAllergy,
    });
  } else {
    try {
      ses.findOne({ sessionKey: session }).then((data) => {
        const userId = data.userId;
        patientlogin.findById(userId).then((result) => {
          patient.findById(result.patientId).then(async (response) => {
            patientResult = response;
            await ticket.create({
              type: req.body.type,
              condition,
              createdBy: {
                firstName: patientResult.name[0].given[0],
                lastName: patientResult.name[0].family,
                userId: patientResult._id,
              },
              symptom,
              medication: {
                isTaking: medication,
                medicineList: req.body.medicine,
              },
              measurements: {
                oxygenSaturation,
                temperature,
                heartRate,
                hbaLevel,
                glucoseFasting,
                glucoseRandom,
              },
              medicationAllergy: {
                hasAllergy: medicationAllergy,
                allergy: req.body.allergy,
              },
              completed: false,
              dateCreated: Date.now(),
              description,
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        success: false,
        message: "Cannot save to the database",
      });
    }
    return res.status(200).send({
      success: true,
      symptom,
    });
  }
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
    console.log(Patientlogin);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
    });
  }
  const msg = {
    from: "Pluscare",
    to: `${req.body.patientEmail}`,
    subject: "Pluscare Registration",
    text:
      "Username: " +
      userEmail +
      " Password: " +
      `${userPassword}` +
      " Thankyou",
  };
  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.pass,
      },
      port: 465,
      host: "smtp.gmail.com",
    })
    .sendMail(msg, (err) => {
      if (err) {
        return console.log("Error ", err);
      } else {
        return console.log("Email Sent");
      }
    });
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
