const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  ticketId: String,
  userId: String,
  status: String,
});

const ticketFinal = mongoose.model("Ticketfinal", ticketSchema);
module.exports = ticketFinal;
