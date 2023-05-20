const foodCategoryRootModel = require('../models/food-category-root.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const cloudinary = require('../configs/cloudinary');

const getAllFoodCategory = async (req, res) => {
  try {
    const foodCates = await foodCategoryRootModel.find();

    return res.status(200).json(foodCates);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createFoodCate = async (req, res) => {
  try {
    const { ...body } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    body.image = image.secure_url;
    const newCate = await foodCategoryRootModel.create(body);

    return res.status(200).json(newCate);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateCate = async (req, res) => {
  try {
    const { ...body } = req.body;
    const id_cate = req.params.id_cate;
    const updatedCate = await foodCategoryRootModel.findByIdAndUpdate(
      id_cate,
      body,
      { new: true },
    );

    return res.status(200).json(updatedCate);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteCate = async (req, res) => {
  try {
    const idCate = req.params.id_cate;
    const result = await foodCategoryRootModel.findByIdAndDelete(idCate);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id_cate;
    const cate = await foodCategoryRootModel.findById(id);

    if (!cate) {
      throw new ErrorResponse(404, 'Not found food category root');
    }

    return res.status(200).json(cate);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllFoodCategory,
  createFoodCate,
  updateCate,
  deleteCate,
  findById,
};
