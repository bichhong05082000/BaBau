const foodModel = require('../models/food.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const foodCategoryModel = require('../models/food-category.model');
const cloudinary = require('../configs/cloudinary');
const saveFoodModel = require('../models/save.food.model');

const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find().populate('idCategory');

    return res.status(200).json(foods);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const getAllFoodOfCategory = async (req, res) => {
  try {
    const idCate = req.params.id_cate;
    const foods = await foodModel.find({ idCategory: idCate });

    return res.status(200).json(foods);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createFoodOfCategory = async (req, res) => {
  try {
    const idCate = req.params.id_cate;
    let cate = await foodCategoryModel.findById(idCate);

    if (!cate) {
      throw new ErrorResponse(404, 'not found category');
    }

    const { ...body } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    body.image = image.secure_url;
    body.idCategory = idCate;

    const newFood = await foodModel.create(body);

    return res.status(201).json(newFood);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const updateFood = async (req, res) => {
  try {
    const id = req.params.id;
    const { ...body } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(updatedFood);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await foodModel.findByIdAndDelete(id);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const idUser = req.account._id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const existingFood = await saveFoodModel.findOne({
      idFood: id,
      idUser,
    });

    const foodSave = {
      ...food?._doc,
      isSave: existingFood ? true : false,
    };

    return res.status(200).json(foodSave);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllFood,
  getAllFoodOfCategory,
  createFoodOfCategory,
  updateFood,
  deleteFood,
  findById,
};
