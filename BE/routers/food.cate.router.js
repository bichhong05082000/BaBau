const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

const {
  getAllFoodCategory,
  createFoodCate,
  updateCate,
  deleteCate,
  findById,
  getCateOfRootCate,
} = require('../controllers/category.food.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllFoodCategory))
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.single('image'),
    asyncMiddleware(createFoodCate),
  );

router
  .route('/root/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getCateOfRootCate));

router
  .route('/:id_cate')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.single('image'),
    asyncMiddleware(updateCate),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteCate),
  );

module.exports = router;
