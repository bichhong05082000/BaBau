const mongoose = require('mongoose');

const postByWeekSchema = mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    content: {
      type: String,
      default: 'Loading...',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('postByWeek', postByWeekSchema);
