const configuration = require('../configs/configuration');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorResponse(403, 'Unauthorized');
  }

  const token = authorization.split(' ')[1];
  const decode = jwt.verify(token, configuration.SECRET_KEY);
  const account = await accountModel.findById(decode._id).select('-password');

  if (!account) {
    throw new ErrorResponse(403, 'Unauthorized');
  }

  if (account.activated != 'Activated') {
    throw new ErrorResponse(403, 'Unauthorized');
  }

  req.account = account;
  next();
};
