const mongoose = require('mongoose');

const childChartModel = require('../models/child-chart.model');
const momChartModel = require('../models/mom-chart.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllChildChart = async (req, res) => {
  try {
    const childChartes = await childChartModel
      .find({
        idAccount: req.account._id,
      })
      .populate({
        path: 'fetalDevelopmentWeekly',
        match: { week: { $eq: '$weeksOfPregnacy' } },
      })
      .lean();

    return res.status(200).json(childChartes);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createChildChart = async (req, res) => {
  try {
    const { ...body } = req.body;
    const idAccount = req.account._id;
    body.idAccount = idAccount;
    const newChart = await childChartModel.create(body);

    return res.status(201).json(newChart);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateChildChart = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;
    const { ...body } = req.body;

    const updatedChart = await childChartModel.findOneAndUpdate(
      {
        _id: id,
        idAccount: idAccount,
      },
      body,
      { new: true },
    );

    return res.status(200).json(updatedChart);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteChildChart = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;

    const result = await childChartModel.findOneAndDelete({
      _id: id,
      idAccount: idAccount,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;

    const result = await childChartModel
      .findById({
        _id: id,
        idAccount: idAccount,
      })
      .populate({
        path: 'fetalDevelopmentWeekly',
        match: { week: { $eq: '$weeksOfPregnacy' } },
      })
      .lean();

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createMomAndChildChart = async (req, res) => {
  const { momData, childData } = req.body;
  const idAccount = req.account._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const momChart = await momChartModel.create(
      [
        {
          ...momData,
          idAccount,
        },
      ],
      { session },
    );
    const momChartId = momChart[0]._id;

    const childChart = await childChartModel.create(
      [
        {
          ...childData,
          idAccount,
          momId: momChartId,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return res.status(201).json({
      momChart: momChart[0],
      childChart: childChart[0],
    });
  } catch (error) {
    await session.abortTransaction();
    throw new ErrorResponse(500, error.message);
  } finally {
    session.endSession();
  }
};

const getMomAndChildChartByID = async (req, res) => {
  try {
    const id = req.params.id;
    const childCharts = await childChartModel
      .find({
        $or: [{ _id: id }, { momId: id }],
      })
      .populate('momId')
      .populate({
        path: 'fetalDevelopmentWeekly',
        match: { week: { $eq: '$weeksOfPregnacy' } },
      })
      .lean();

    if (!childCharts) {
      throw new ErrorResponse(404, 'No child chart found with the provided id');
    }

    const objResult = childCharts.map((item) => ({
      child: {
        ...item,
        fetalDevelopmentWeekly: item.fetalDevelopmentWeekly,
      },
      mom: item.momId,
    }));

    return res.status(200).json({
      data: objResult,
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const getAllMomAndChildChart = async (req, res) => {
  try {
    const idAccount = req.account._id;

    const childCharts = await childChartModel
      .find({ idAccount: idAccount })
      .populate('momId')
      .populate({
        path: 'fetalDevelopmentWeekly',
        match: { week: { $eq: '$weeksOfPregnacy' } },
      })
      .lean();

    const newDataCovert = childCharts.map((item) => ({
      child: item,
      momId: item.momId,
    }));

    return res.status(200).json({
      data: newDataCovert,
    });
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllChildChart,
  createChildChart,
  updateChildChart,
  deleteChildChart,
  findById,
  createMomAndChildChart,
  getMomAndChildChartByID,
  getAllMomAndChildChart,
};
