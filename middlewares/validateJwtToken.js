const { verifyJwtToken, compareSecretKey } = require('../helpers/jwtClient');
const { isError } = require('../helpers/supporter');
const { getSingleRow } = require('../database/dataModel');

const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'bearer';
const re = /(\S+)\s+(\S+)/;

const parseAuthHeader = (hdrValue) => {
    if (typeof hdrValue !== 'string') {
        return null;
    }
    const matches = hdrValue.match(re);
    return matches && { scheme: matches[1], value: matches[2] };
};

const getJwtTokenFromRequest = (headers) => {
    const authSchemaLower = BEARER_AUTH_SCHEME.toLowerCase();
    let token = null;
    if (headers[AUTH_HEADER]) {
        const authParams = parseAuthHeader(headers[AUTH_HEADER]);
        if (authParams && authSchemaLower === authParams.scheme.toLowerCase()) {
            token = authParams.value;
        }
    }
    return token;
};

const getUserById = async (db, userId) => {
    const where = {
        userId,
    };
    return getSingleRow(db.user, where);
};

const validateJWTToken = async (token, req) => {
    if (!token) {
        const error = new Error('Token Value Missing');
        error.status = 400;
        return error;
    }
    const decodedToken = await verifyJwtToken(token)
        .catch(err => err);
    if (isError(decodedToken)) {
        const error = new Error('Jwt is not valid anymore');
        error.status = 401;
        return error;
    }
    if (decodedToken == null) {
        const error = new Error('Token cannot be decoded');
        error.status = 401;
        return error;
    }
    const { id, jwtId } = decodedToken;
    const userData = await getUserById(req.headers.db, id);
    if (!userData) {
        const error = new Error('This user no longer existed');
        error.status = 401;
        return error;
    }
    if (!compareSecretKey(userData, jwtId)) {
        const error = new Error('Session Expired');
        error.status = 401;
        return error;
    }
    req.headers.user = userData;
    return Promise.resolve(true);
};

module.exports = async (req, res, next) => {
    const token = getJwtTokenFromRequest(req.headers);
    if (!token) {
        const error = new Error('Unauthorized Access');
        error.status = 400;
        error.name = 'No authorization Header or bearer token in the http found';
        return next(error);
    }
    const status = await validateJWTToken(token, req);
    if (isError(status)) {
        return next(status);
    }
    return next();
};
