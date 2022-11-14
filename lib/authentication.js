const patient = require("../Schemas/patientSchema");
const patientlogin = require("../Schemas/patientLoginSchema");
const ses = require("../Schemas/sessions");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

exports.signin = (req, res) => {
  const { myEmail, myPassword } = req.body;
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
};

exports.adminLogin = async (req, res) => {
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
};
