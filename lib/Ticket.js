const patient = require("../patientSchema");
const patientlogin = require("../patientLoginSchema");
const ses = require("../sessions");
const ticket = require("../ticketSchema");

exports.createTicket = async (req, res) => {
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
    // photo.mv(`./uploads/${photo.name}`, async (err) => {
    //   if (err) throw err;
    // });
    try {
      ses.findOne({ sessionKey: session }).then((data) => {
        const userId = data.userId;
        patientlogin.findById(userId).then((result) => {
          patient.findById(result.patientId).then(async (response) => {
            patientResult = response;
            console.log(patientResult._id);
            await ticket.create({
              type: req.body.type,
              createdBy: {
                firstName: patientResult.name[0].given[0],
                lastName: patientResult.name[0].family,
                userID: patientResult._id,
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
                userID: patientResult._id,
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
};

exports.create = (req, res) => {
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
};
