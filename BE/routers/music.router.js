const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllMusic,
  createMusic,
  deleteMusic,
  findById,
} = require('../controllers/music.controller');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllMusic))
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.array('file'),
    asyncMiddleware(createMusic),
  );

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteMusic),
  );

module.exports = router;
