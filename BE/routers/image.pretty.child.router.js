const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAll,
  createImage,
  deleteImg,
  findById,
} = require('../controllers/img.pretty.child.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAll))
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.single('image'),
    asyncMiddleware(createImage),
  );

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteImg),
  );

module.exports = router;
