const express = require('express');

const paramValidator = require('../middlewares/paramValidator');
const catchErrors = require('../middlewares/errorHandlers');

const controller = require('../controllers/auth');

const router = express.Router();

router.post('/login-with-mobile',
    paramValidator(controller.loginWithMobileNumberParams()),
    catchErrors(controller.loginWithMobileNumber));

router.get('/resend-otp',
    paramValidator(controller.resendOtpParams()),
    catchErrors(controller.resendOtp));

router.post('/verify-otp',
    paramValidator(controller.verifyOtpParams()),
    catchErrors(controller.verifyOtp));

module.exports = router;
