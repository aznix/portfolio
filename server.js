const express = require("express");
require("dotenv").config();
const path = require('path');
const cors = require("cors");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')

const app = express(); // NU werkt het
const PORT = process.env.PORT || 3000;



// Middleware
app.use(cors());
app.use(express.json());


// Nodemailer configuratie
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // Gmail
    pass: process.env.GMAIL_PASS           // 16-cijferig App Password
  },
});

transporter.verify((error, success) => {
  if (error) console.log("SMTP fout:", error);
  else console.log("SMTP server is ready ✅");
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/send", (req, res) => {

  const { name, email, message } = req.body; // haal data uit POST request
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: process.env.GMAIL_USER, // Change to your recipient
  from: `"${name}" <${process.env.GMAIL_USER}>`, // Change to your verified sender
  subject: `Nieuw bericht van ${name}`,
  text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`,
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
});

// Server maken
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
