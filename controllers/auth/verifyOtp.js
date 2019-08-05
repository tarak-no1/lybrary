const { getResponseObject } = require('../../helpers/supporter');

module.exports.verifyOtpParams = () => [
    { typee: 'string', value: 'mobile_number' },
    { typee: 'string', value: 'otp' },
];

module.exports.verifyOtp = async (req, res, next) => {
    const response = getResponseObject();

    response.data = {
        user_id: '1234',
        jwt_token: '',
    };
    return res.status(200).json(response);
};
