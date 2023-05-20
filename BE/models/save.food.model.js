const mongoose = require('mongoose');

const saveFoodSchema = mongoose.Schema({
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'account',
  },
  idFood: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'food',
  },
});

module.exports = mongoose.model('saveFood', saveFoodSchema);
