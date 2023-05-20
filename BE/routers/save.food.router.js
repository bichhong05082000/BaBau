const expres = require('express');
const router = expres.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllSaveFood,
  saveNewFood,
  deleteSaveFood,
} = require('../controllers/save.food.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllSaveFood))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(saveNewFood));

router
  .route('/:id')
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteSaveFood));

module.exports = router;
