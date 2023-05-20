const expres = require('express');
const router = expres.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllFetalMove,
  createNewFetalMove,
  updateFetalMove,
  deleteFetalMove,
} = require('../controllers/fetal.movement.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllFetalMove))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createNewFetalMove));

router
  .route('/:id')
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateFetalMove))
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteFetalMove));

module.exports = router;
