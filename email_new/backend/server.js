const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) =>{
  // get the data from the request body
  const { to, subject, message } = req.body;
  try {
    // get the email address from the .env file  
    const sent_from = process.env.EMAIL_USER;
    // send the email
    await sendEmail(subject, message, to, sent_from, to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
