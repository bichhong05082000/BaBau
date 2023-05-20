const expres = require('express');
const router = expres.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllFood,
  getAllFoodOfCategory,
  createFoodOfCategory,
  updateFood,
  deleteFood,
  findById,
} = require('../controllers/food.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.route('/').get(asyncMiddleware(getAllFood));

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(updateFood),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteFood),
  );

router
  .route('/category/:id_cate')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllFoodOfCategory))
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.single('image'),
    asyncMiddleware(createFoodOfCategory),
  );

module.exports = router;
