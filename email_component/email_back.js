
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text, html) {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ewbtoolkit@gmail.com',
          pass: 'bqaihisjcrfnqciy',
        },
        tls: {rejectUnauthorized: false,},
      });
  
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'ewbtoolkit@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: html || '',
      });
  
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
module.exports = {
    sendEmail: sendEmail
  };