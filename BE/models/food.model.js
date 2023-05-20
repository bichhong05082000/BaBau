const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    //cac buoc lam
    making: {
      type: String,
    },
    //phu hop voi
    suitableFor: {
      type: String,
      default: 'mang thai, moi sinh, cho con bu',
    },
    //mo ta
    description: {
      type: String,
    },
    //nguyen lieu
    ingredient: {
      type: String,
    },
    //link video
    video: {
      type: String,
    },
    //thoi gian nau
    timeCook: {
      type: String,
      default: '15 phut',
    },
    idCategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'foodCategory',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('food', foodSchema);
