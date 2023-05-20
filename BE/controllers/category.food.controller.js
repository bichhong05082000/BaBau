const foodCategoryModel = require('../models/food-category.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const cloudinary = require('../configs/cloudinary');

const getAllFoodCategory = async (req, res) => {
  try {
    const foodCates = await foodCategoryModel.find().populate('idRoot');

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

    const newCate = await foodCategoryModel.create({
      ...body,
      monthlyData: JSON.parse(body.monthlyData),
    });

    return res.status(200).json(newCate);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateCate = async (req, res) => {
  try {
    const { ...body } = req.body;
    const id_cate = req.params.id_cate;

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      body.image = image.secure_url;
    }

    const updatedCate = await foodCategoryModel.findByIdAndUpdate(
      id_cate,
      {
        ...body,
        monthlyData: JSON.parse(body.monthlyData),
      },
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
    const result = await foodCategoryModel.findByIdAndDelete(idCate);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id_cate;
    const cate = await foodCategoryModel.findById(id);

    if (!cate) {
      throw new ErrorResponse(404, 'not found food category');
    }

    return res.status(200).json(cate);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const getCateOfRootCate = async (req, res) => {
  try {
    const idRoot = req.params.id;

    const cates = await foodCategoryModel
      .find({
        idRoot: idRoot,
      })
      .populate('idRoot');

    return res.status(200).json(cates);
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
  getCateOfRootCate,
};
