const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllStory,
  createStory,
  updateStory,
  deleteStory,
  findById,
} = require('../controllers/story-for-child.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router
  .route('/')
  .get(asyncMiddleware(getAllStory))
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    upload.single('image'),
    asyncMiddleware(createStory),
  );

router
  .route('/:id_story')
  .get(asyncMiddleware(findById))
  .patch(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(updateStory),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteStory),
  );

module.exports = router;
