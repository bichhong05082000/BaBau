const FetalDevelopmentWeekly = require('../models/fetal-development-weekly.model');
const ErrorResponse = require('../helpers/ErrorResponse');

const createFetalDevelopmentWeekly = async (req, res) => {
  try {
    const fetalDevelopmentWeekly = await FetalDevelopmentWeekly.create(
      req.body,
    );

    res.status(201).json({ fetalDevelopmentWeekly });
  } catch (error) {
    throw new ErrorResponse(400, error.message);
  }
};

const getFetalDevelopmentWeeklies = async (req, res) => {
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

    const fetalDevelopmentWeeklies = await FetalDevelopmentWeekly.find(bdQuery)
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await FetalDevelopmentWeekly.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      vifetalDevelopmentWeekliesdeos: fetalDevelopmentWeeklies,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(400, error.message);
  }
};

const getFetalDevelopmentWeeklyById = async (req, res) => {
  try {
    const fetalDevelopmentWeekly = await FetalDevelopmentWeekly.findById(
      req.params.id,
    );

    if (!fetalDevelopmentWeekly) {
      return res
        .status(404)
        .json({ error: 'Not found fetalDevelopmentWeekly.' });
    }

    res.json({ fetalDevelopmentWeekly });
  } catch (error) {
    throw new ErrorResponse(400, error.message);
  }
};

const updateFetalDevelopmentWeekly = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const options = { new: true };

    const updatedFetalDevelopmentWeekly =
      await FetalDevelopmentWeekly.findByIdAndUpdate(id, update, options);

    res.status(200).json(updatedFetalDevelopmentWeekly);
  } catch (error) {
    throw new ErrorResponse(400, error.message);
  }
};

const deleteFetalDevelopmentWeekly = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFetalDevelopmentWeekly =
      await FetalDevelopmentWeekly.findByIdAndDelete(id);

    if (!deletedFetalDevelopmentWeekly) {
      return res
        .status(404)
        .json({ message: 'Not found fetalDevelopmentWeekly' });
    }

    res
      .status(200)
      .json({ message: 'Delete fetalDevelopmentWeekly successfully' });
  } catch (error) {
    throw new ErrorResponse(400, error.message);
  }
};

module.exports = {
  createFetalDevelopmentWeekly,
  getFetalDevelopmentWeeklies,
  getFetalDevelopmentWeeklyById,
  updateFetalDevelopmentWeekly,
  deleteFetalDevelopmentWeekly,
};
