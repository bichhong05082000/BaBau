const mongoose = require('mongoose');

const momChartSchema = mongoose.Schema(
  {
    //can nang cua me
    weight: {
      type: Number,
    },
    //tuan thai
    weeksOfPregnacy: {
      type: Number,
    },
    //huyet ap
    bloodPressure: {
      type: Number,
    },
    //chi so duong huyet luc doi
    fastingGlycemicIndex: {
      type: Number,
    },
    //chi so duong huyet sau an 1h
    eating1hGlycemicIndex: {
      type: Number,
    },
    //chi so duong huyet sau an 2h
    eating2hGlycemicIndex: {
      type: Number,
    },
    //ghi chu, ket qua kham
    note: {
      type: String,
    },
    //benh ly thuong gap
    commonDiseases: {
      type: String,
    },
    //lan kham
    visit: {
      type: String,
    },
    idAccount: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('momChart', momChartSchema);
