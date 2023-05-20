'use strict';

const verificationCode = (code) => {
  const message = {
    subject: 'Verification Code',
    text:
      `Thank you for signing up for our service. To verify your email address, please enter the following code into the verification field on our website: \n` +
      `${code} \n` +
      `Thank you.
          `,
  };

  return message;
};

const signupEmail = (name) => {
  const message = {
    subject: 'Account Registration',
    text: `Hi ${name}! Thank you for creating an account with us!.`,
  };

  return message;
};

const resetEmail = (host, resetToken) => {
  const resetLink = `http://localhost:4200/reset-password/${resetToken}`;
  const message = {
    subject: 'Reset Password',
    html: `<p>You are receiving this because you have requested to reset your password for your account.</p><br><p>Please click on the following link, or paste this into your browser to complete the process:</p><br><br><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    <a href=${resetLink}>
    <button type="button" onclick="window.location.href = ${resetLink};">Change Password</button>
  </a>`,
  };

  return message;
};

const confirmResetPasswordEmail = () => {
  const message = {
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
};

module.exports = {
  verificationCode,
  signupEmail,
  resetEmail,
  confirmResetPasswordEmail,
};
