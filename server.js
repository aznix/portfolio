require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API);

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Bouw het bericht
  const msg = {
    to: process.env.SENDGRID_TO || process.env.SENDGRID_FROM, // ontvangend e-mail
    from: process.env.SENDGRID_FROM, // geverifieerde sender bij SendGrid
    replyTo: email,                  // reply gaat naar de gebruiker die het formulier invult
    subject: `Nieuw bericht van ${name}`,
    text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent via SendGrid ✅");
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    if (error.response) console.error(error.response.body);
    res.status(500).send("Error sending email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
