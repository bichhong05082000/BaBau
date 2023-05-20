const postWeekModel = require('../models/post-by-week.model');
const cloudinary = require('../configs/cloudinary');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAllPost = async (req, res) => {
  try {
    const {
      size = 20,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
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

    const posts = await postWeekModel
      .find()
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await postWeekModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      posts: posts,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createPost = async (req, res) => {
  try {
    const { ...body } = req.body;
    const icon = await cloudinary.uploader.upload(req.file.path);
    body.icon = icon.secure_url;
    const newPost = await postWeekModel.create(body);

    return res.status(201).json(newPost);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { ...body } = req.body;
    const updatedPost = await postWeekModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await postWeekModel.findByIdAndDelete(id);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await postWeekModel.findById(id);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  findById,
};
