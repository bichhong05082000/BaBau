const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getFetalDevelopmentWeeklyById,
  getFetalDevelopmentWeeklies,
  createFetalDevelopmentWeekly,
  updateFetalDevelopmentWeekly,
  deleteFetalDevelopmentWeekly,
} = require('../controllers/fetal.development.weekly.controller');

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getFetalDevelopmentWeeklyById),
  )
  .put(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(updateFetalDevelopmentWeekly),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteFetalDevelopmentWeekly),
  );

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(createFetalDevelopmentWeekly),
  )
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getFetalDevelopmentWeeklies),
  );

module.exports = router;
