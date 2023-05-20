const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const configuration = require('../configs/configuration');
const listStatus = require('../constants/statusUser');

const accountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: String,
    },
    fullname: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    //ten cua be
    childName: {
      type: String,
    },
    //ngay sinh du kien
    childBirthday: {
      type: String,
    },
    //so du
    balance: {
      type: Number,
      default: 0,
    },
    //ky kinh nguyet cuoi
    lastMenstrualPeriod: {
      type: String,
    },
    activated: {
      enum: listStatus,
      type: String,
      default: listStatus[1],
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

accountSchema.pre('save', function (next) {
  const account = this;
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  next();
});

accountSchema.pre('create', function (next) {
  const account = this;
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  next();
});

accountSchema.pre('findOneAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  this.setUpdate(account);
  next();
});

module.exports = mongoose.model('account', accountSchema);
