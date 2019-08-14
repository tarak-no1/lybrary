const express = require('express');

const paramValidator = require('../middlewares/paramValidator');
const catchErrors = require('../middlewares/errorHandlers');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'hello',
    });
});


module.exports = router;
