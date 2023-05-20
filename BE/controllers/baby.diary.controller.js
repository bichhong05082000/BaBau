const babyDiaryModel = require('../models/baby-diary.model');
const cloudinary = require('../configs/cloudinary');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllMyBabyDiary = async (req, res) => {
  try {
    const {
      size = 20,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
    } = req.query;
    const idAccount = req.account._id;

    const bdQuery = { idAccount };

    if (key && key !== '""') {
      bdQuery.name = { $regex: new RegExp('.*' + key + '.*', 'i') };
    }

    if (startDate || endDate) {
      bdQuery.createdAt = {};
      if (startDate) bdQuery.createdAt.$gte = new Date(startDate);
      if (endDate) bdQuery.createdAt.$lte = new Date(endDate);
    }

    const babyDiaries = await babyDiaryModel
      .find(bdQuery)
      .sort('-createdAt')
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await babyDiaryModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      babyDiaries: babyDiaries,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createBabyDiary = async (req, res) => {
  try {
    const { ...body } = req.body;
    const idAccount = req.account._id;

    if (req?.file?.path) {
      const image = await cloudinary.uploader.upload(req.file.path);
      body.image = image.secure_url;
    }

    body.idAccount = idAccount;
    const newDiary = await babyDiaryModel.create(body);

    return res.status(201).json(newDiary);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateBabyDiary = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;
    const { ...body } = req.body;

    if (req?.file?.path) {
      const image = await cloudinary.uploader.upload(req.file.path);
      body.image = image.secure_url;
    }

    const updatedDiary = await babyDiaryModel.findOneAndUpdate(
      {
        _id: id,
        idAccount: idAccount,
      },
      body,
      { new: true },
    );

    return res.status(200).json(updatedDiary);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteDiary = async (req, res) => {
  try {
    const id = req.params.id;
    const idAccount = req.account._id;

    const result = await babyDiaryModel.findOneAndDelete({
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

    const diary = await babyDiaryModel.findOne({
      _id: id,
      idAccount: req.account._id,
    });

    return res.status(200).json(diary);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllMyBabyDiary,
  createBabyDiary,
  updateBabyDiary,
  deleteDiary,
  findById,
};
