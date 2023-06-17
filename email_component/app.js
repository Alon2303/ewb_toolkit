const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ewbtoolkit@gmail.com',
        pass: 'bqaihisjcrfnqciy',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: 'ewbtoolkit@gmail.com',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Email sent:', info.messageId);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email!');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});