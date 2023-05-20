const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const accountModel = require('../models/account.model');
const typeRole = require('../constants/typeRole');
const configuration = require('../configs/configuration');
const ErrorResponse = require('../helpers/ErrorResponse');
const cloudinary = require('../configs/cloudinary');
const paypal = require('../configs/paypal');
const mail = require('../services/sendMail.service');
const Otp = require('../models/activation.model');
const { generateToken, verifyToken } = require('../helpers/generateToken');
const { generateUniqueCode } = require('../helpers/genarateCode');

const getAllAccount = async (req, res, next) => {
  try {
    const {
      size = 10,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
    } = req.query;

    const bdQuery = {
      role: typeRole.USER,
      ...(key &&
        key != '""' && {
          email: {
            $regex: new RegExp('.*' + key + '.*', 'i'),
          },
        }),
      ...(startDate &&
        endDate && {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        }),
      ...(startDate &&
        !endDate && {
          createdAt: {
            $gte: new Date(startDate),
          },
        }),
      ...(!startDate &&
        endDate && {
          createdAt: {
            $lte: new Date(endDate),
          },
        }),
    };

    let accounts = await accountModel
      .find(bdQuery)
      .sort('-createdAt')
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await accountModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      accounts: accounts,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const account = await accountModel.findOne({ email });
    let payload = {};

    if (account) {
      if (account.activated === 'Pending-Verify') {
        return res.status(500).json({
          message:
            'The account has not been activated via email. Please resend opt for this email to active',
        });
      }

      if (account.activated === 'Activated') {
        return res.status(500).json({
          message: 'Account already exists',
        });
      }

      if (account.activated === 'Deactivated') {
        payload.user = account._id;
        payload.email = account.email;
      }
    } else {
      const user = await accountModel.create(req.body);
      payload.user = user._id;
      payload.email = user.email;
    }

    const code = await generateUniqueCode();
    await Otp.create({ ...payload, code });

    // Send verification email with OTP
    await mail.sendEmail(payload.email, 'verification-code', code);

    return res.status(201).json({
      statusCode: 201,
      message:
        'Verification code sent successfully. Check your email to get OTP',
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const confirmRegister = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const account = await accountModel.findOne({ email: email });

    if (!account) {
      throw new ErrorResponse(404, 'Account not found');
    }

    let validCode = await Otp.findOneAndUpdate(
      { user: account._id, active: true },
      { active: false },
    );

    let isValidCode = bcryptjs.compareSync(code, validCode?.code ?? '');

    if (!isValidCode) {
      throw new Error('Invalid verification code.');
    }

    await Promise.all([
      //Change status to active user
      await accountModel.findByIdAndUpdate(account._id, {
        activated: 'Activated',
      }),
      // send verification code
      await mail.sendEmail(account.email, 'signup', account.email),
    ]);

    const payload = {
      email,
      _id: account._id,
      role: account.role,
    };

    let token = jwt.sign(payload, configuration.SECRET_KEY, {
      expiresIn: '10h',
    });

    res.status(200).json({ ...payload, jwt: token });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const resendVerifyCode = async (req, res, next) => {
  const { email } = req.body;
  try {
    let code = await generateUniqueCode();

    let user = await accountModel.findOne({ email });
    if (!user) {
      throw new Error('This email does not exist. Please create another one.');
    }
    //Deactivated older verification code
    await Otp.findOneAndUpdate(
      { user: user._id, active: true },
      { active: false },
    );
    //Create new verification code
    await Otp.create({
      user: user._id,
      code,
    });
    //send verification code
    await mail.sendEmail(email, 'verification-code', code);

    return res.status(200).json({
      message: 'Resend Verification Code Successfully.',
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await accountModel.findOne({ email: email });

    if (!user) {
      throw new ErrorResponse(400, 'Username or password is incorrect');
    }

    let checkPass = bcryptjs.compareSync(password, user.password);
    if (!checkPass) {
      throw new ErrorResponse(400, 'Username or password is incorrect');
    }

    if (user.role !== typeRole.ADMIN && user.activated !== 'Activated') {
      throw new ErrorResponse(403, 'This account has not been activated yet.');
    }

    let payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      balance: user.balance,
    };

    let token = jwt.sign(payload, configuration.SECRET_KEY, {
      expiresIn: '10h',
    });

    return res.status(200).json({
      ...payload,
      jwt: token,
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateAccount = async (req, res) => {
  try {
    let id = req.account._id;
    const { ...body } = req.body;

    if (body.balance && req.account.role === typeRole.USER) {
      throw new ErrorResponse(400, 'Not permission update balance');
    }

    if (req.account.role === typeRole.ADMIN) {
      id = req.params.id;
    } else {
      delete body.activated;
      delete body.password;
      delete body.role;
    }

    if (req?.file?.path) {
      const avatar = await cloudinary.uploader.upload(req.file.path);
      body.avatar = avatar.secure_url;
    }

    const updateAcc = await accountModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(updateAcc);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAccount = await accountModel.findByIdAndUpdate(
      id,
      { activated: 'Deactivated' },
      { new: true },
    );

    if (!updatedAccount) {
      throw new Error('Account not found');
    }

    res.status(200).json(updatedAccount);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const getMyInfor = async (req, res) => {
  try {
    const idAccount = req.account._id;
    const account = await accountModel.findById(idAccount);

    return res.status(200).json(account);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const paymentPaypal = async (req, res) => {
  try {
    const idAccount = req.account._id;
    const { money } = req.body;
    const obj = [
      {
        name: 'Payment for  premium',
        quantity: 1,
        price: +money,
        currency: 'USD',
      },
    ];

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `babau://payment-success?money=${money}&id_account=${idAccount}`,
        cancel_url: `babau://payment-failed`,
      },
      transactions: [
        {
          item_list: {
            items: obj,
          },
          amount: {
            currency: 'USD',
            total: money.toString(),
          },
          description: 'Hat for the best team ever',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log('Error pay: ' + error);
        res.json({
          statusCode: 500,
          message: 'Server Error When Create Payment',
        });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.status(200).json({
              paymentLink: payment.links[i],
            });
          }
        }
      }
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const responseBillSuccess = async (req, res) => {
  try {
    let money = req.query.money;
    let idAccount = req.query.id_account;

    let account = await accountModel.findById(idAccount);

    let accountUpdated = await accountModel.findByIdAndUpdate(
      idAccount,
      { balance: Number(account.balance) + Number(money) },
      { new: true },
    );

    return res.status(200).json({
      statusCode: 201,
      message: 'Payment success',
      money: money,
      user: accountUpdated,
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const responseBillCancel = async (req, res) => {
  try {
    res.status(500).json({
      statusCode: 500,
      message: 'Server Error When Payment',
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const changePassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const payload = verifyToken(token, 'forgot');

    if (!payload) {
      throw new Error('Invalid token.');
    }

    const user = await accountModel.findOne({
      _id: payload.user,
      email: payload.email,
      activated: 'Activated',
    });

    if (!user) {
      throw new ErrorResponse(
        403,
        'You are not allowed to reset your account. Please verify your email.',
      );
    }

    //update password
    await accountModel.findOneAndUpdate(
      { _id: payload.user },
      {
        password: password,
      },
    );

    await mail.sendEmail(payload.email, 'reset-confirmation');

    res.status(200).json({
      message: 'Your password has been reset',
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const changePasswordByAuth = async (req, res) => {
  try {
    const { ...body } = req.body;
    const id = req.account._id;
    const user = await accountModel.findById(id);

    let checkPass = bcryptjs.compareSync(body.password, user.password);

    if (!checkPass) {
      throw new ErrorResponse(400, 'The old password is incorrect');
    }

    await accountModel.findOneAndUpdate(
      { _id: id },
      { password: body.newPassword },
    );

    return res.status(200).json(user);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const forgetPasswordGetOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('You must enter an email address.');
    }

    const existingUser = await accountModel.findOne({
      email,
      activated: 'Activated',
    });

    if (!existingUser) {
      throw new ErrorResponse(404, 'No user found for this email address.');
    }

    const payload = {
      user: existingUser.id,
      email: existingUser.email,
    };

    let token = generateToken(payload, 'forgot');
    await mail.sendEmail(existingUser.email, 'reset', token, req.headers.host);

    res.status(200).json({
      success: true,
      message: 'Please check your email for the link to reset your password.',
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllAccount,
  register,
  confirmRegister,
  resendVerifyCode,
  login,
  updateAccount,
  deleteAccount,
  getMyInfor,
  paymentPaypal,
  responseBillSuccess,
  responseBillCancel,
  changePassword,
  changePasswordByAuth,
  forgetPasswordGetOTP,
};
