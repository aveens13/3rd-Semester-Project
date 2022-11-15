//Imports
const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Routes
const bodyParser = require("body-parser");
const handlers = require("./lib/handlers");
const registation = require("./lib/registration");
const ticket = require("./lib/Ticket");
const authentication = require("./lib/authentication");

//Environment Config
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const PROD = process.env.PROD;

if (PROD) {
  app.use(express.static(__dirname + "/vite-svelte/dist"));
}

//database connection
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.ajkefxa.mongodb.net/pluscare?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Mongodb connection established with username ${process.env.DBUSERNAME}`
    )
  )
  .catch((err) => console.log(err));

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileupload());

//server api requests
app.get("/api/is-logged-in", handlers.isLoggedin);
app.get("/api/patients/", handlers.getPatients);
app.get("/api/visitHospital/:ticketId", handlers.visitHospital);
app.get("/api/sendNurse/:ticketId", handlers.sendNurse);
app.get("/api/logout", handlers.logout);
app.get("/api/contact/:patient", handlers.contactPatient);
app.get("/api/getimage/:picture", handlers.getPicture);
app.get("/api/ticketinfo", handlers.ticketInfo);
app.get("/api/docs", handlers.documentation);
app.get("/api/deleteTicket/:ticketId", handlers.deleteTicket);
app.get("/api/getticketNotifications/:patientId", handlers.notificationTicket);
app.get("/api/getTicketIndividual/:userId", handlers.ticketIndividual);

//Post API requests
app.post("/api/signin", authentication.signin);
app.post("/api/create", ticket.create);
app.post("/api/admin-login", authentication.adminLogin);
app.post("/api/createticket", ticket.createTicket);
app.post("/api/register-patient", registation.registerPatient);

app.listen(PORT, "0.0.0.0", 1, (req, res) => {
  console.log(`Listening to the server on http://localhost:${PORT}`);
});
