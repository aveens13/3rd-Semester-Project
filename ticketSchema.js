const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  createdBy: {
    firstName: String,
    lastName: String,
  },
  condition: {
    type: Array,
  },
  symptom: {
    type: Array,
  },
  medication: {
    isTaking: String,
    medicineList: String,
  },
  measurements: {
    oxygenSaturation: Number,
    temperature: Number,
    heartRate: Number,
    hbaLevel: Number,
    glucoseFasting: Number,
    glucoseRandom: Number,
  },
  medicationAllergy: {
    hasAllergy: String,
    allergy: String,
  },
  conditionImage: {
    data: Buffer,
    contentType: String,
  },
  completed: {
    type: Boolean,
  },
  dateCreated: {
    type: Date,
  },
  description: {
    type: String,
  },
});
const ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
