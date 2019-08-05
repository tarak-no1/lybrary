const { getResponseObject } = require('../../helpers/supporter');

module.exports.resendOtpParams = () => [
    { type: 'string', value: 'mobile_number' },
];

module.exports.resendOtp = async (req, res, next) => {
    const response = getResponseObject();

    setTimeout(() => {
        res.status(200).json(response);
    }, 3000);
};
