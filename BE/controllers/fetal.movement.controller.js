const fetalMoveModel = require('../models/fetal.movements.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllFetalMove = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const date = req.query.date;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const bodyQuery = {
      idUser: req.account._id,
    };

    if (date) {
      bodyQuery.date = date;
    } else if (startDate && endDate) {
      bodyQuery.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      bodyQuery.date = { $gte: startDate };
    } else if (endDate) {
      bodyQuery.date = { $lte: endDate };
    }

    const fetalMove = await fetalMoveModel
      .find(bodyQuery)
      .skip((page - 1) * perPage)
      .limit(perPage);

    let count = await fetalMoveModel.countDocuments(bodyQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / perPage),
      count: count,
      fetalMove: fetalMove,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createNewFetalMove = async (req, res) => {
  try {
    const id = req.account._id;
    const { ...body } = req.body;

    body.idUser = id;
    const newFetalMove = await fetalMoveModel.create(body);

    return res.status(201).json(newFetalMove);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateFetalMove = async (req, res) => {
  try {
    const idUser = req.account._id;
    const id = req.params.id;
    const { ...body } = req.body;
    const newFetal = await fetalMoveModel.findOneAndUpdate(
      { idUser, _id: id },
      body,
      { new: true },
    );
    return res.status(200).json(newFetal);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteFetalMove = async (req, res) => {
  try {
    const idUser = req.account._id;
    const id = req.params.id;

    const deFetal = await fetalMoveModel.findOneAndDelete({
      idUser,
      _id: id,
    });

    return res.status(200).json(deFetal);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllFetalMove,
  createNewFetalMove,
  updateFetalMove,
  deleteFetalMove,
};
