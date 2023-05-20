const mongoose = require('mongoose');

const childChartSchema = mongoose.Schema(
  {
    //can nang
    weight: {
      type: Number,
      required: true,
    },
    //tuan thai
    weeksOfPregnacy: {
      type: Number,
      required: true,
    },
    //dai
    width: {
      type: Number,
    },
    //duong kinh luong dinh
    dualTopDiameter: {
      type: Number,
    },
    //chieu dai xuong dui
    femurLength: {
      type: Number,
    },
    //chu vi dau
    headPerimeter: {
      type: Number,
    },
    //ghi chu
    note: {
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
    momId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'momChart',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

childChartSchema.virtual('fetalDevelopmentWeekly', {
  ref: 'fetalDevelopmentWeekly',
  localField: 'weeksOfPregnacy',
  foreignField: 'week',
  justOne: true,
});

// Add populate method to childChartSchema
childChartSchema.methods.toJSON = function () {
  const child = this.toObject();
  return {
    ...child,
    fetalDevelopmentWeekly: child.fetalDevelopmentWeekly,
  };
};

module.exports = mongoose.model('childChart', childChartSchema);
