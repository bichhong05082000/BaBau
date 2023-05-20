const sgMail = require('../configs/mail');
const configs = require('../configs/configuration');
const template = require('../configs/templateMail');

exports.sendEmail = async (email, type, data, host = '') => {
  try {
    const message = prepareTemplate(type, host, data);
    const config = {
      from: {
        name: 'Babau',
        email: configs.MAIL,
      },
      to: email,
      subject: message.subject,
      text: message.text,
      html: message.html,
    };
    return await sgMail.send(config);
  } catch (error) {
    throw new Error(error);
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'verification-code':
      message = template.verificationCode(data);
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    default:
      message = '';
  }

  return message;
};
