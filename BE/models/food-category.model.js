const mongoose = require('mongoose');

const monthlyDataSchema = mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['OK', 'WARNING', 'ERROR'],
    },
  },
  { _id: false },
);

const foodCategrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    monthlyData: {
      type: [monthlyDataSchema],
    },
    idRoot: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'foodCategoryRoot',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('foodCategory', foodCategrySchema);
