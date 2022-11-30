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
  const address = [
    {
      line: [`${req.body.streetName}`],
      city: `${req.body.cityName}`,
      state: `${req.body.stateName}`,
    },
  ];
  const blood = req.body.blood;
  const weight = req.body.weight;
  let userId;
  console.log(typeof +req.body.patientNumber);
  try {
    const Patient = await patient.create({
      name,
      gender,
      birthDate,
      telecom: [
        {
          value: +req.body.patientNumber,
          use: "mobile",
          system: "phone",
        },
        {
          value: req.body.patientEmail,
          system: "email",
        },
      ],
      address,
      blood,
      weight,
    });
    userId = Patient.id;
    // console.log(Patient.id);
  } catch (error) {
    console.log(error.code);
    if (error.code == 11000) {
      return res.status(400).send({
        message:
          "Email/Phone Number is already registered under Pluscare. Consider Updating Email/Phone Number or both",
      });
    }
    return res.status(400).send({
      message: "Please enter valid data only",
    });
  }
  userEmail = req.body.patientEmail;
  try {
    await patientlogin.create({
      email: userEmail,
      password: userPassword,
      patientId: userId,
    });
    // console.log(Patientlogin);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Cannot create a login",
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

exports.editPatient = async (req, res) => {
  const patientId = req.params.patientId;
  const name = [
    {
      use: "official",
      given: [`${req.body.firstName}`],
      family: `${req.body.lastName}`,
    },
  ];
  const gender = `${req.body.gender}`;
  const birthDate = `${req.body.birthDate}`;
  const number = +req.body.patientNumber;
  console.log(number);
  const email = req.body.patientEmail;
  // const telecom = [
  //   {
  //     value: `${req.body.patientNumber}`,
  //     use: "mobile",
  //     system: "phone",
  //   },
  //   {
  //     value: `${req.body.patientEmail}`,
  //     system: "email",
  //   },
  // ];
  const address = [
    {
      line: [`${req.body.streetName}`],
      city: `${req.body.cityName}`,
      state: `${req.body.stateName}`,
    },
  ];
  const blood = req.body.blood;
  const weight = req.body.weight;
  const updates = {
    name,
    gender,
    birthDate,
    telecom: [
      {
        value: number,
        use: "mobile",
        system: "phone",
      },
      {
        value: email,
        system: "email",
      },
    ],
    address,
    blood,
    weight,
  };
  console.log(updates);
  try {
    await patient.findByIdAndUpdate(patientId, updates);
    res.status(200).send({
      message: "Updated Successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: "Cannot update the entries",
    });
  }
};
