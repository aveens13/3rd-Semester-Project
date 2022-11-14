const patient = require("../Schemas/patientSchema");
const patientlogin = require("../Schemas/patientLoginSchema");
const nodemailer = require("nodemailer");
const { credentials } = require("../Configurations/config");

exports.registerPatient = async (req, res) => {
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
};
