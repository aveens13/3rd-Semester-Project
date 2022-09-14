const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const patientSchema = new mongoose.Schema({
  name: {
    type: Array,
    required: [true, "Please Enter your name"],
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  telecom: {
    type: Array,
  },
  address: {
    type: Array,
  },
});

const patient = mongoose.model("Patient", patientSchema);

module.exports = patient;
