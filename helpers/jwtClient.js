const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const {
    privateCert,
    publicCert,
    jwtValidityKey,
    jwtIssuer,
} = require('../config/keys');

const generateJwtToken = payload => new Promise((resolve, reject) => {
    jwt.sign(
        { ...payload },
        privateCert,
        {
            algorithm: 'RS512',
            expiresIn: '7d',
            issuer: jwtIssuer,
        },
        (err, token) => {
            if (err) return reject(new Error('Error while generating Jwt Token.'));
            return resolve(token);
        },
    );
});

const verifyJwtToken = token => new Promise((resolve, reject) => {
    jwt.verify(
        token,
        publicCert,
        { algorithm: ['RS512'], issuer: jwtIssuer },
        (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        },
    );
});

const generateSecretKey = (user) => {
    const secret = user.userId.toString() + moment(user.lastLogin).format('YYYY-MM-DD HH:mm:ss');
    return crypto
        .createHmac('sha256', jwtValidityKey)
        .update(secret)
        .digest('hex');
};

const compareSecretKey = (user, secretKey) => {
    const hash = generateSecretKey(user);
    return secretKey === hash;
};

module.exports = {
    generateSecretKey,
    compareSecretKey,
    generateJwtToken,
    verifyJwtToken,
};
