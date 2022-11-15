const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  ticketId: String,
  userId: String,
  status: String,
  type: String,
});

const ticketFinal = mongoose.model("Ticketfinal", ticketSchema);
module.exports = ticketFinal;
