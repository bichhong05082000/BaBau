const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

const {
  getAllMyBabyDiary,
  createBabyDiary,
  updateBabyDiary,
  deleteDiary,
  findById,
} = require('../controllers/baby.diary.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getAllMyBabyDiary))
  .post(
    asyncMiddleware(authMiddleware),
    upload.single('image'),
    asyncMiddleware(createBabyDiary),
  );

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .patch(
    asyncMiddleware(authMiddleware),
    upload.single('image'),
    asyncMiddleware(updateBabyDiary),
  )
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteDiary));

module.exports = router;
