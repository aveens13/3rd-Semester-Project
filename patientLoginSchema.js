const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
});

//before saving a user
loginSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("Creating the user", this);
  next();
});
//after saving a user
loginSchema.post("save", function (doc, next) {
  console.log("New User Was Created", doc);
  next();
});

const patientlogin = mongoose.model("Patientlogin", loginSchema);
module.exports = patientlogin;
