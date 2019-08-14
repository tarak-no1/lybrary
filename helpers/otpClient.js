const otplib = require('otplib');
const crypto = require('crypto');

otplib.authenticator.options = {
    digits: 4,
    crypto,
};

const generateOtp = (secret) => {
    if (!secret) secret = 'tarak';
    return otplib.authenticator.generate(secret);
};

const verifyOtp = (token, secret) => otplib.authenticator.verify({ token, secret });

module.exports = {
    generateOtp,
    verifyOtp,
};
