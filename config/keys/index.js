const fs = require('fs');
const path = require('path');

const privateCert = fs.readFileSync(`${__dirname}/lyb-private.pem`);
const publicCert = fs.readFileSync(`${__dirname}/lyb-public.pem`);
const jwtValidityKey = 'lybrary-jwt-validity';

module.exports = {
    privateCert,
    publicCert,
    jwtValidityKey,
    jwtIssuer: 'jwt-lybrary',
};
