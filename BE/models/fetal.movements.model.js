const mongoose = require('mongoose');

const fetalMoveSchema = mongoose.Schema(
  {
    date: {
      type: String,
      requried: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeCount: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    idUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('fetalMove', fetalMoveSchema);
