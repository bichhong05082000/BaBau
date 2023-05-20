const mongoose = require('mongoose');

const fetalDevelopmentWeeklyValuesSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false },
);

const fetalDevelopmentWeeklySchema = new mongoose.Schema(
  {
    week: { type: Number, required: true, unique: true }, // Tuần của thai nhi
    GSD: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị GSD (mm)
    CRL: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị CRL (mm)
    BPD: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị BPD (mm)
    FL: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị FL (mm)
    HC: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị HC (mm)
    AC: { type: fetalDevelopmentWeeklyValuesSchema, required: true }, // Giá trị AC (mm)
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  'fetalDevelopmentWeekly',
  fetalDevelopmentWeeklySchema,
);
