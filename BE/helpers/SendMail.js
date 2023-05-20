const nodemailer = require('nodemailer');
const configuration = require('../configs/configuration');

const sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    service: 'Gmail',
    auth: {
      user: configuration.gmail.USER,
      pass: configuration.gmail.PASS,
    },
  });

  const message = {
    from: `Admin ${configuration.gmail.USER} from BaBau`,
    to: email,
    subject: subject,
    html: `<h1 style="color: red;">YOUR OTP: ${html}, Thank you for signing up for our service. To verify your email address, please enter the following code into the verification field on our website</h1>`,
  };

  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendMail;
