require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
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

app.post("/send", (req, res) => {
  const { name, email, message } = req.body; // haal data uit POST request

  // Nodemailer opties
  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `Nieuw bericht van ${name}`,
    text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`
  };

  // Mail verzenden
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Server maken
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
