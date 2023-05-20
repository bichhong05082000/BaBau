const mongoose = require('mongoose');

//nhat ky cua be
const babyDiarySchema = mongoose.Schema(
  {
    //hinh anh cua be (link anh)
    image: {
      type: String,
    },
    //ghi chu, noi dung nhat ky
    note: {
      type: String,
    },
    //tuan thai
    weeksOfPregnancy: {
      type: Number,
    },
    datePhoto: {
      type: Date,
      default: Date.now(),
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

module.exports = mongoose.model('babyDiary', babyDiarySchema);
