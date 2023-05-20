const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllAccount,
  register,
  confirmRegister,
  login,
  updateAccount,
  deleteAccount,
  paymentPaypal,
  responseBillSuccess,
  responseBillCancel,
  getMyInfor,
  forgetPasswordGetOTP,
  changePassword,
  changePasswordByAuth,
  resendVerifyCode,
} = require('../controllers/account.controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(getAllAccount),
  )
  .post(asyncMiddleware(register))
  .patch(
    asyncMiddleware(authMiddleware),
    upload.single('avatar'),
    asyncMiddleware(updateAccount),
  );

router
  .route('/:id')
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteAccount),
  );

router.route('/otp').post(asyncMiddleware(forgetPasswordGetOTP));
router.route('/password').post(asyncMiddleware(changePassword));
router.route('/resend-code').post(asyncMiddleware(resendVerifyCode));

router
  .route('/profile')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getMyInfor))
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(changePasswordByAuth));

router
  .route('/balance/:id')
  .patch(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(updateAccount),
  );

router.route('/login').post(asyncMiddleware(login));
router.route('/confirm').post(asyncMiddleware(confirmRegister));

router
  .route('/payment')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(paymentPaypal));

router.route('/payment/success').get(asyncMiddleware(responseBillSuccess));
router.route('/payment/cancel').get(asyncMiddleware(responseBillCancel));

module.exports = router;
