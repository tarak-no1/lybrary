const uuid = require('uuid');
const db = require('../database/');

module.exports = () => (req, res, next) => {
    req.headers.db = db;

    // adding correlation id to headers
    if (req && !req.headers['x-correlation-id']) {
        req.x_correlation_id = uuid();
        res.setHeader('X-Correlation-ID', req.x_correlation_id);
    }
    return next();
};
