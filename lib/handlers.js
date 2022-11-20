const patient = require("../Schemas/patientSchema");
const patientlogin = require("../Schemas/patientLoginSchema");
const ses = require("../Schemas/sessions");
const ticket = require("../Schemas/ticketSchema");
const ticketFinal = require("../Schemas/ticketFinalSchema");

//Server Api requests method  = "get"
//Api route to check if the patient is logged in previously using cokkies
exports.isLoggedin = (req, res) => {
  const session = req.cookies.session;
  if (session) {
    ses.findOne({ sessionKey: session }).then((data) => {
      const userId = data.userId;
      patientlogin.findById(userId).then((result) => {
        // console.log(result);
        patient.findById(result.patientId).then((response) => {
          // console.log(response);
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
};

exports.logout = (req, res) => {
  res.clearCookie("session");
  res.send({
    status: "logout",
  });
};

exports.visitHospital = async (req, res) => {
  const ticketId = req.params.ticketId;
  const userId = await ticket.findById(ticketId).then((results) => {
    return results.createdBy.userID;
  });
  const UserDetails = await patient.findById(userId).then((results) => {
    return results;
  });
  console.log(ticketId);
  await ticket.findByIdAndUpdate(ticketId, { completed: true });
  // console.log(UserDetails);
  try {
    await ticketFinal.create({
      ticketId,
      userId,
      status: "Pluscare has requested you to visit Hospital",
      type: "Hospital",
    });
  } catch (err) {
    return res.status(404).send({
      status: "Server Error",
      message: "Error database",
    });
  }
  res.status(200).send({
    status: "Emergency",
    message: "Visit Hospital",
  });
};

exports.sendNurse = async (req, res) => {
  const ticketId = req.params.ticketId;
  const userId = await ticket.findById(ticketId).then((results) => {
    return results.createdBy.userID;
  });
  const UserDetails = await patient.findById(userId).then((results) => {
    return results;
  });
  // console.log(ticketId);
  await ticket.findByIdAndUpdate(ticketId, { completed: true });
  // console.log(UserDetails);
  try {
    await ticketFinal.create({
      ticketId,
      userId,
      status: "Pluscare has sent a nurse and he/she will contact you",
      type: "Nurse",
    });
  } catch (err) {
    return res.status(404).send({
      status: "Server Error",
      message: "Error database",
    });
  }
  return res.status(200).send({
    status: "Queued for checkup",
    message: "Send Nurse",
  });
};

exports.getPatients = async (req, res) => {
  try {
    const numberofPatients = await patient.find({}).count();
    patient.find({}).then((data) => {
      // console.log(data);
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
};

exports.contactPatient = async (req, res) => {
  const patientInfo = req.params.patient;
  try {
    await patient.findById(patientInfo).then((results) => {
      // console.log(results);
      res.status(200).send({
        contactNo: results.telecom[0].value,
        patient: results,
      });
    });
  } catch (err) {
    res.status(404).send({
      contactNo: "",
    });
  }
};

exports.getPicture = async (req, res) => {
  var filename = req.params.picture;
  await ticket.findById(filename).then((results) => {
    res.setHeader("content-type", results.conditionImage.contentType);
    res.send(results.conditionImage.data);
  });
};

exports.ticketInfo = async (req, res) => {
  const Tickets = await ticket.find({}).count();
  let noOfTickets = 0;
  await ticket.find({}).then((results) => {
    for (let dat in results) {
      if (results[dat].completed == false) {
        noOfTickets += 1;
      }
    }
    res.status(200).send({
      data: results,
      noOfTickets,
      ticketsdone: Tickets - noOfTickets,
    });
  });
};

exports.ticketIndividual = async (req, res) => {
  const userId = req.params.userId;
  const user = await patient.findById(userId).then((response) => {
    return response;
  });
  try {
    await ticket
      .find({
        createdBy: {
          firstName: user.name[0].given[0],
          lastName: user.name[0].family,
          userID: userId,
        },
      })
      .then((response) => {
        res.status(200).send(response);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.documentation = (req, res) => {
  res.send({
    message: "Api Docs is still under development",
  });
};

exports.deleteTicket = async (req, res) => {
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
};

exports.notificationTicket = async (req, res) => {
  var userId = req.params.patientId;
  try {
    ticketFinal.find({ userId }).then((response) => {
      // console.log(response);
      res.status(200).send(response);
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
