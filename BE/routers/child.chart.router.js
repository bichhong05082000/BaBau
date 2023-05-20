const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getAllChildChart,
  createChildChart,
  updateChildChart,
  deleteChildChart,
  findById,
  createMomAndChildChart,
  getMomAndChildChartByID,
  getAllMomAndChildChart,
} = require('../controllers/child.chart.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllChildChart))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createChildChart));

router
  .route('/result-schedule')
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(createMomAndChildChart),
  );

router
  .route('/result-schedule/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getMomAndChildChartByID),
  );

router
  .route('/result-schedule')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getAllMomAndChildChart),
  );

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateChildChart))
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteChildChart));

module.exports = router;
