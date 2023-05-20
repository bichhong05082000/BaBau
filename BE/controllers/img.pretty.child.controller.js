const imgPrettyChildModel = require('../models/image-pretty-children.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const cloudinary = require('../configs/cloudinary');

const getAll = async (req, res) => {
  try {
    const {
      size = 10,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
      gender,
    } = req.query;

    const bdQuery = {};

    if (key && key !== '""') {
      bdQuery.name = { $regex: new RegExp('.*' + key + '.*', 'i') };
    }

    if (startDate || endDate) {
      bdQuery.createdAt = {};
      if (startDate) bdQuery.createdAt.$gte = new Date(startDate);
      if (endDate) bdQuery.createdAt.$lte = new Date(endDate);
    }

    if (gender) {
      bdQuery.gender = gender;
    }

    const images = await imgPrettyChildModel
      .find(bdQuery)
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await imgPrettyChildModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      images: images,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createImage = async (req, res) => {
  try {
    const { ...body } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    body.image = image.secure_url;
    const newImg = await imgPrettyChildModel.create(body);
    return res.status(201).json(newImg);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const img = await imgPrettyChildModel.findById(id);

    if (!img) {
      throw new ErrorResponse(404, 'not found');
    }

    return res.status(200).json(img);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteImg = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await imgPrettyChildModel.findByIdAndDelete(id);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = { getAll, createImage, findById, deleteImg };
