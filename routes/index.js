const express = require('express');

const router = express.Router();

const defaultRouter = require('./default.router');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

router.use('/', defaultRouter);
router.use('/auth/', authRouter);
router.use('/user/', userRouter);

module.exports = router;
