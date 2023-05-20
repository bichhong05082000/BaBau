const mongoose = require('mongoose');
const typeMonth = require('../constants/typeMonth');

const musicSchema = mongoose.Schema(
  {
    audio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    threeMonth: {
      type: typeMonth,
      type: String,
      default: typeMonth[0],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('music', musicSchema);
