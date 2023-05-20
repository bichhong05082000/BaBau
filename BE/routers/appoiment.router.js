const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getAllMyAppoiment,
  createNewAppoiment,
  updateAppoiment,
  deleteAppoiment,
  findById,
} = require('../controllers/appoiment.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllMyAppoiment))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createNewAppoiment));

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateAppoiment))
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteAppoiment));

module.exports = router;
