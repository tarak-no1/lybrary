const express = require('express');

const paramValidator = require('../middlewares/paramValidator');
const catchErrors = require('../middlewares/errorHandlers');

const controller = require('../controllers/user');

const router = express.Router();

router.get('/profile',
    catchErrors(controller.getProfile));


module.exports = router;
