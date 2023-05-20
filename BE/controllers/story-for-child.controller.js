const storyModel = require('../models/story-for-child.mode');
const ErrorResponse = require('../helpers/ErrorResponse');
const cloudinary = require('../configs/cloudinary');

const getAllStory = async (req, res) => {
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

    const stories = await storyModel
      .find()
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await storyModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      stories: stories,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createStory = async (req, res) => {
  try {
    const { ...body } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    body.image = image.secure_url;
    const newStory = await storyModel.create(body);

    return res.status(201).json(newStory);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateStory = async (req, res) => {
  try {
    const idStory = req.params.id_story;
    const { ...body } = req.body;
    const result = await storyModel.findByIdAndUpdate(idStory, body, {
      new: true,
    });

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteStory = async (req, res) => {
  try {
    const idStory = req.params.id_story;
    const result = await storyModel.findByIdAndDelete(idStory);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const idStory = req.params.id_story;
    const result = await storyModel.findById(idStory);

    if (!result) {
      throw new ErrorResponse(404, 'Not found story');
    }

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllStory,
  createStory,
  updateStory,
  deleteStory,
  findById,
};
