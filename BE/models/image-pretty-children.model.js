const mongoose = require('mongoose');

const imagePrettyChildrenSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      default: 'male',
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'imagePrettyChildren',
  imagePrettyChildrenSchema,
);
