const mongoose = require('mongoose');
//lich kham
const appoimentSchema = mongoose.Schema(
  {
    //ngay hen kham
    date: {
      type: String,
    },
    //lan kham
    visit: {
      type: String,
    },
    //dia diem kham
    address: {
      type: String,
    },
    //bac sy
    doctor: {
      type: String,
    },
    idAccount: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
  },
  {
    versionkey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('appoiment', appoimentSchema);
