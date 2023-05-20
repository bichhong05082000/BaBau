const momChartModel = require('../models/mom-chart.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllMomChart = async (req, res) => {
  try {
    const momChartes = await momChartModel.find({
      idAccount: req.account._id,
    });

    return res.status(200).json(momChartes);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createMomChart = async (req, res) => {
  try {
    const { ...body } = req.body;
    const idAccount = req.account._id;
    body.idAccount = idAccount;
    const newChart = await momChartModel.create(body);

    return res.status(201).json(newChart);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateMomChart = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;
    const { ...body } = req.body;

    const updatedChart = await momChartModel.findOneAndUpdate(
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

const deleteMomChart = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;
    const result = await momChartModel.findOneAndDelete({
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
    const result = await momChartModel.findById({
      _id: id,
      idAccount: idAccount,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllMomChart,
  createMomChart,
  updateMomChart,
  deleteMomChart,
  findById,
};
