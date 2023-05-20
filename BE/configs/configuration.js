require('dotenv').config();
module.exports = {
  SALT_ROUND: +10,
  SECRET_KEY: 'fdafeojjfsdjurururskd',
  // DB_URL: 'mongodb://127.0.0.1:27017/BaBau',
  USER_ADMIN: {
    email: 'babau@gmail.com',
    password: 'bichhong0508',
    phone: '0338058587',
    address: 'Ha Noi',
    role: 'admin',
    activated: 'Activated',
  },
  gmail: {
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASS,
  },
  MAIL: 'hongxinh05082000@gmail.com',
  SENDGRID_API_KEY:
    'SG.ybSTPNtARkO8z4pjBW6nfA.S5yaDi9JOPhOvXOnS-RdZLG5fbu4g2O4S_lglYr0V_khong',
};
