const videoChildrenModel = require('../models/video-children.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const getAll = async (req, res) => {
  try {
    const {
      size = 7,
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

    const videos = await videoChildrenModel
      .find(bdQuery)
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await videoChildrenModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      videos: videos,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createVideo = async (req, res) => {
  try {
    const { ...body } = req.body;
    const video = await videoChildrenModel.create(body);

    return res.status(201).json(video);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const dlVideo = await videoChildrenModel.findByIdAndDelete(id);

    return res.status(200).json(dlVideo);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const { ...body } = req.body;
    const dlVideo = await videoChildrenModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(dlVideo);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await videoChildrenModel.findById(id);

    return res.status(200).json(video);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAll,
  createVideo,
  deleteVideo,
  updateVideo,
  findById,
};
