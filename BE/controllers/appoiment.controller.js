const appoimentModel = require('../models/appoiment.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllMyAppoiment = async (req, res) => {
  try {
    const idAccount = req.account._id;
    const {
      size = 20,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
    } = req.query;

    const bdQuery = { idAccount };

    if (key && key !== '""') {
      bdQuery.name = { $regex: new RegExp('.*' + key + '.*', 'i') };
    }

    if (startDate || endDate) {
      bdQuery.createdAt = {};
      if (startDate) bdQuery.createdAt.$gte = new Date(startDate);
      if (endDate) bdQuery.createdAt.$lte = new Date(endDate);
    }

    const appoiment = await appoimentModel
      .find(bdQuery)
      .sort('-createdAt')
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await appoimentModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      appoiment: appoiment,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createNewAppoiment = async (req, res) => {
  try {
    const idAccount = req.account._id;
    const { ...body } = req.body;
    body.idAccount = idAccount;
    const newAppoiment = await appoimentModel.create(body);

    return res.status(201).json(newAppoiment);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateAppoiment = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;
    const { ...body } = req.body;

    const updatedAppoi = await appoimentModel.findOneAndUpdate(
      { _id: id, idAccount: idAccount },
      body,
      { new: true },
    );

    return res.status(200).json(updatedAppoi);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteAppoiment = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;

    const result = await appoimentModel.findOneAndDelete({
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

    const result = await appoimentModel.findOne({
      _id: id,
      idAccount: idAccount,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllMyAppoiment,
  createNewAppoiment,
  updateAppoiment,
  deleteAppoiment,
  findById,
};
