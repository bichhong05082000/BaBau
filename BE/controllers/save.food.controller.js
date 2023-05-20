const saveFoodModel = require('../models/save.food.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const foodModel = require('../models/food.model');

const getAllSaveFood = async (req, res) => {
  try {
    const id = req.account._id;
    const food = await saveFoodModel
      .find({
        idUser: id,
      })
      .populate({
        path: 'idFood',
        populate: {
          path: 'idCategory',
          model: 'foodCategory',
          populate: {
            path: 'idRoot',
            model: 'foodCategoryRoot',
          },
        },
      });

    return res.status(200).json(food);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const saveNewFood = async (req, res) => {
  try {
    const id = req.account._id;
    const { idFood } = req.body;

    if (!idFood.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const food = await foodModel.findOne({ _id: idFood });

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const existingFood = await saveFoodModel.findOne({ idFood, idUser: id });

    if (existingFood) {
      return res.status(404).json({ message: 'Food is saved' });
    }

    const newSF = await saveFoodModel.create({ idUser: id, idFood: idFood });
    const populatedSF = await newSF.populate({
      path: 'idFood',
      populate: {
        path: 'idCategory',
        model: 'foodCategory',
        select: 'name idRoot',
        populate: {
          path: 'idRoot',
          model: 'foodCategoryRoot',
          select: 'name',
        },
      },
    });

    return res.status(201).json(populatedSF);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteSaveFood = async (req, res) => {
  try {
    const id = req.params.id;

    const existingFood = await saveFoodModel.findById(id);

    if (!existingFood) {
      return res.status(404).json({ message: 'This food is not found' });
    }

    const food = await saveFoodModel.findByIdAndDelete({
      _id: id,
      idUser: req.account._id,
    });

    const populatedSF = await food.populate('idFood');

    return res.status(200).json(populatedSF);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllSaveFood,
  saveNewFood,
  deleteSaveFood,
};
