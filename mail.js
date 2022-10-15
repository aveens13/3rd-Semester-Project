const nodemailer = require("nodemailer");
const { credentials } = require("./config");

const msg = {
  from: "Pluscare",
  to: "aveenavbhattarai@gmail.com",
  subject: "Pluscare Registration",
  text: "Registered Successfully" + "Thankyou",
};
nodemailer
  .createTransport({
    service: "gmail",
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.pass,
    },
    port: 465,
    host: "smtp.gmail.com",
  })
  .sendMail(msg, (err) => {
    if (err) {
      return console.log("Error ", err);
    } else {
      return console.log("Email Sent");
    }
  });
