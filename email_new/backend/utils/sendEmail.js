const nodemailer = require("nodemailer");



const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER, // Enter here email address from which you want to send emails
      pass: process.env.EMAIL_PASS, // Enter here password for email account from which you want to send emails
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log(send_to);
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };
  console.log(options);
  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
