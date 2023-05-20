const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getAllMomChart,
  createMomChart,
  updateMomChart,
  deleteMomChart,
  findById,
} = require('../controllers/mom.chart.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllMomChart))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createMomChart));

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateMomChart))
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteMomChart));

module.exports = router;
