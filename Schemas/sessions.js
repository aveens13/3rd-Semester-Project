const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  sessionKey: String,
  userId: String,
});

const ses = mongoose.model("Session", sessionSchema);

module.exports = ses;
