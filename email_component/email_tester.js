const { sendEmail } = require('./email_back');

const myEmail = "eranaizi1995@gmail.com";
const mySubject = "Hello from EWB Toolkit";
const myText = "This is a test email from the Node.js file - EWB Toolkit.";
const myHtml = "<h1>This is a test <b>email<b> from the Node.js file - EWB Toolkit.</h1>";
// Usage example:

sendEmail(myEmail, mySubject, myText, myHtml);
