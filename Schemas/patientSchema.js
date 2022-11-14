const mongoose = require("mongoose");
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
    unique: true,
  },
  address: {
    type: Array,
  },
});

const patient = mongoose.model("Patient", patientSchema);

module.exports = patient;
